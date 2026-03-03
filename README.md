# Kronex

Kronex provides tools and scripts for managing GPU-enabled infrastructure on Google Kubernetes Engine (GKE).

## Features
- **GKE L4 vGPU Provisioning**: Automated script for setting up GKE clusters with NVIDIA L4 GPUs using time-sharing (vGPU).

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

## License
MIT
