import React from 'react';
import { Cpu, Server, Activity } from 'lucide-react';

export const DashboardHero: React.FC = () => {
  return (
    <div className="py-12 border-b border-[#222222] mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand p-2 rounded-lg">
          <Cpu className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Kronex vGPU Dashboard</h1>
      </div>
      <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
        Real-time monitoring and management of NVIDIA L4 vGPU instances on GKE.
        Optimize resource utilization with automated time-sharing provisioning.
      </p>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333333] rounded-full text-sm text-gray-300">
          <Server className="w-4 h-4" />
          <span>Cluster: gke-l4-cluster-01</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-500">
          <Activity className="w-4 h-4" />
          <span>Status: Active & Scaling</span>
        </div>
      </div>
    </div>
  );
};
