#!/usr/bin/env bash
# Verification script for GKE L4 vGPU time-sharing
# Usage: ./verify_vgpu_sharing.sh [NUM_PODS]

set -euo pipefail

NUM_PODS="${1:-8}"

echo "Cleaning up old debug pods..."
kubectl delete pod -l app=gpu-debug --ignore-not-found

echo "Deploying ${NUM_PODS} GPU debug pods..."
for i in $(seq 1 "${NUM_PODS}"); do
  cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: gpu-debug-$i
  labels:
    app: gpu-debug
spec:
  restartPolicy: Never
  containers:
  - name: cuda
    image: nvidia/cuda:12.1.0-runtime-ubuntu22.04
    command: ["bash", "-c", "echo '=== Pod $i started ==='; nvidia-smi; sleep 300"]
    resources:
      limits:
        nvidia.com/gpu: 1
EOF
done

echo "Waiting for pods to be ready (up to 180s)..."
kubectl wait --for=condition=Ready pod -l app=gpu-debug --timeout=180s

echo -e "\n=== Pod distribution across nodes ==="
kubectl get pods -l app=gpu-debug -o wide

echo -e "\n=== nvidia-smi from inside every pod ==="
for pod in $(kubectl get pods -l app=gpu-debug -o jsonpath='{.items[*].metadata.name}'); do
  echo -e "\n--- $pod ---"
  kubectl exec "$pod" -- nvidia-smi
done

echo -e "\nDone! All ${NUM_PODS} pods should be sharing the same GPU."
echo "You can monitor live with: kubectl exec gpu-debug-1 -- watch -n 2 nvidia-smi"
