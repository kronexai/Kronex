#!/usr/bin/env bash
# Safer GKE L4 vGPU (time-sharing) provisioning + verification
# Usage: ./provision_gke_l4_vgpu.sh
#        (override via env vars or export PROJECT_ID=... etc.)

set -euo pipefail

# Defaults (override via env vars)
PROJECT_ID="${PROJECT_ID:-}"
CLUSTER_NAME="${CLUSTER_NAME:-vgpu-agent-sandbox}"
ZONE="${ZONE:-us-central1-a}"
NUM_NODES="${NUM_NODES:-1}"
MACHINE_TYPE="${MACHINE_TYPE:-g2-standard-4}"
ACCELERATOR_TYPE="${ACCELERATOR_TYPE:-nvidia-l4}"
ACCELERATOR_COUNT="${ACCELERATOR_COUNT:-1}"
ENABLE_TIME_SHARING="${ENABLE_TIME_SHARING:-true}"   # ← set to false for exclusive GPUs
MAX_SHARED_CLIENTS="${MAX_SHARED_CLIENTS:-8}"       # safe default for L4

# Basic checks
command -v gcloud >/dev/null || { echo "gcloud not found"; exit 1; }
command -v kubectl >/dev/null || { echo "kubectl not found"; exit 1; }

if [ -z "$PROJECT_ID" ]; then
  PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
  [ -z "$PROJECT_ID" ] && { echo "Set PROJECT_ID env var or gcloud config"; exit 1; }
fi

echo "Using project: $PROJECT_ID"

# Create lightweight CPU-only cluster first (best practice)
echo "Creating base CPU cluster..."
gcloud container clusters create "$CLUSTER_NAME" \
  --location "$ZONE" \
  --num-nodes 1 \
  --machine-type e2-standard-2 \
  --image-type COS_CONTAINERD \
  --quiet \
  --workload-pool="${PROJECT_ID}.svc.id.goog"

# Build GPU node pool accelerator string
ACCELERATOR_FLAG="type=${ACCELERATOR_TYPE},count=${ACCELERATOR_COUNT}"
if [ "${ENABLE_TIME_SHARING}" = "true" ]; then
  echo "Enabling GPU time-sharing (vGPU style) — up to ${MAX_SHARED_CLIENTS} pods per L4"
  ACCELERATOR_FLAG="${ACCELERATOR_FLAG},gpu-sharing-strategy=time-sharing,max-shared-clients-per-gpu=${MAX_SHARED_CLIENTS}"
fi

echo "Creating L4 GPU node pool..."
gcloud container node-pools create gpu-pool \
  --cluster "$CLUSTER_NAME" \
  --location "$ZONE" \
  --machine-type "$MACHINE_TYPE" \
  --num-nodes "$NUM_NODES" \
  --accelerator "$ACCELERATOR_FLAG" \
  --gpu-driver-version=latest \
  --image-type COS_CONTAINERD \
  --quiet

echo "Fetching credentials..."
gcloud container clusters get-credentials "$CLUSTER_NAME" --location "$ZONE"

echo "Waiting for GPU drivers & device plugin (30-90s)..."
sleep 45

echo "Nodes:"
kubectl get nodes -o wide

echo "GPU capacity on nodes:"
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{" → nvidia.com/gpu: "}{.status.capacity["nvidia.com/gpu"]}{"\n"}{end}'

# GPU debug pod
echo "Applying GPU debug pod..."
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: gpu-debug
spec:
  restartPolicy: Never
  containers:
  - name: cuda
    image: nvidia/cuda:12.1.0-runtime-ubuntu22.04
    command: ["bash", "-c", "echo '=== nvidia-smi output ==='; nvidia-smi || true; sleep 30"]
    resources:
      limits:
        nvidia.com/gpu: 1
EOF

echo "Waiting for pod (up to 180s)..."
kubectl wait --for=condition=Ready pod/gpu-debug --timeout=180s || true

echo "Pod logs:"
kubectl logs gpu-debug || true

echo "Cleaning up..."
kubectl delete pod gpu-debug --ignore-not-found

echo "Done!
- Time-sharing enabled by default (set ENABLE_TIME_SHARING=false for exclusive GPUs).
- Drivers installed automatically.
- For production: add --spot, autoscaling, or use the NVIDIA GPU Operator for advanced features.
- Delete with: gcloud container clusters delete $CLUSTER_NAME --location $ZONE --quiet"
