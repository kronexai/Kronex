import { Activity, Thermometer, Database, Zap } from 'lucide-react';
import { DashboardHero } from './components/DashboardHero';
import { StatsCard } from './components/StatsCard';
import { GpuTable } from './components/GpuTable';
import { DailyEvolution } from './components/DailyEvolution';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand/30">
      <nav className="border-b border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-brand fill-brand" />
            <span className="font-bold text-lg tracking-tight">KRONEX</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Monitoring</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <DashboardHero />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total GPU Usage"
            value="89"
            unit="%"
            icon={Activity}
            trend="+12% from last hour"
            trendType="negative"
          />
          <StatsCard
            title="Avg. Temperature"
            value="68"
            unit="°C"
            icon={Thermometer}
            trend="Stable"
            trendType="neutral"
          />
          <StatsCard
            title="Memory Allocated"
            value="18.4"
            unit="GB / 24GB"
            icon={Database}
            trend="Within limits"
            trendType="positive"
          />
          <StatsCard
            title="Active Shared Pods"
            value="8"
            unit="Pods"
            icon={Zap}
            trend="Max capacity reached"
            trendType="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <GpuTable />
          </div>
          <div>
            <DailyEvolution />
          </div>
        </div>

        <section className="bg-gradient-to-br from-brand/5 to-transparent border border-[#222222] p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-bold mb-4">L4 Time-Slicing Insights</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Our L4 time-slicing configuration allows up to 8 pods to share a single physical GPU efficiently.
            This is ideal for inference workloads and developer environments where full GPU utilization
            isn't required per pod.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-brand font-bold text-lg">8:1</div>
              <div className="text-sm text-gray-500 font-medium">Sharing Ratio</div>
            </div>
            <div className="space-y-2">
              <div className="text-brand font-bold text-lg">24GB</div>
              <div className="text-sm text-gray-500 font-medium">VRAM Per Node</div>
            </div>
            <div className="space-y-2">
              <div className="text-brand font-bold text-lg">G2-Standard-4</div>
              <div className="text-sm text-gray-500 font-medium">Machine Type</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#222222] py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Zap className="w-5 h-5" />
            <span className="text-sm">© 2026 Kronex Infrastructure Tools. MIT License.</span>
          </div>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
