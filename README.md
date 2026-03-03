# Kronex

Kronex provides tools and scripts for managing GPU-enabled infrastructure on Google Kubernetes Engine (GKE).

## Features
- **GKE L4 vGPU Provisioning**: Automated script for setting up GKE clusters with NVIDIA L4 GPUs using time-sharing (vGPU).
- **GPU Sharing Verification**: Tools to confirm and monitor real-time GPU sharing across multiple pods.

## Scripts

### `provision_gke_l4_vgpu.sh`
This script automates the creation of a GKE cluster and a node pool with NVIDIA L4 GPUs. It supports GPU time-sharing by default.

#### Usage
```bash
export PROJECT_ID="your-project-id"
./provision_gke_l4_vgpu.sh
```

#### Configuration
You can override the following environment variables:
- `CLUSTER_NAME`: Name of the GKE cluster (default: `vgpu-agent-sandbox`)
- `ZONE`: Google Cloud zone (default: `us-central1-a`)
- `ENABLE_TIME_SHARING`: Set to `false` for exclusive GPUs (default: `true`)
- `MAX_SHARED_CLIENTS`: Maximum number of shared clients per GPU (default: `8`)

---

### `verify_vgpu_sharing.sh`
This script verifies that GPU time-sharing is working by deploying multiple pods that request the same GPU resource.

#### Usage
```bash
./verify_vgpu_sharing.sh 8
```

#### What you will see
1. **Pod Distribution**: All 8 pods will typically be scheduled on the same node (sharing the single L4 GPU).
2. **GPU Memory Sharing**: When running `nvidia-smi` inside each pod:
    - Every pod reports the full L4 capacity (e.g., 24 GB).
    - `memory.used` is the cumulative total across all sharing pods.
    - `nvidia-smi` lists separate CUDA processes for each pod.

#### Live Monitoring
To watch memory usage in real-time as pods start up:
```bash
kubectl exec gpu-debug-1 -- watch -n 2 nvidia-smi
```

## License
MIT
