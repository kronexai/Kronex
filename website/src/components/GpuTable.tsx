import React from 'react';

interface PodStatus {
  name: string;
  node: string;
  gpuUsage: string;
  memoryUsed: string;
  status: 'Running' | 'Pending' | 'Error';
}

const pods: PodStatus[] = [
  { name: 'gpu-debug-1', node: 'gke-gpu-pool-l4-01', gpuUsage: '12%', memoryUsed: '2.1 GB', status: 'Running' },
  { name: 'gpu-debug-2', node: 'gke-gpu-pool-l4-01', gpuUsage: '15%', memoryUsed: '2.4 GB', status: 'Running' },
  { name: 'gpu-debug-3', node: 'gke-gpu-pool-l4-01', gpuUsage: '8%', memoryUsed: '1.8 GB', status: 'Running' },
  { name: 'gpu-debug-4', node: 'gke-gpu-pool-l4-01', gpuUsage: '22%', memoryUsed: '3.2 GB', status: 'Running' },
  { name: 'gpu-debug-5', node: 'gke-gpu-pool-l4-01', gpuUsage: '18%', memoryUsed: '2.8 GB', status: 'Running' },
  { name: 'gpu-debug-6', node: 'gke-gpu-pool-l4-01', gpuUsage: '14%', memoryUsed: '2.3 GB', status: 'Running' },
];

export const GpuTable: React.FC = () => {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#222222]">
        <h3 className="font-semibold">GPU Sharing Status (Time-Slicing)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Pod Name</th>
              <th className="px-6 py-3 font-medium">Node</th>
              <th className="px-6 py-3 font-medium">GPU Usage</th>
              <th className="px-6 py-3 font-medium">Memory</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {pods.map((pod) => (
              <tr key={pod.name} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">{pod.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{pod.node}</td>
                <td className="px-6 py-4 text-sm font-medium">{pod.gpuUsage}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{pod.memoryUsed}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    pod.status === 'Running' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {pod.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
