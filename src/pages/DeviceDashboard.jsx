import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { 
  Activity, 
  Zap, 
  RefreshCcw, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Info,
  ArrowUpRight
} from "lucide-react";

Chart.register(...registerables);

// Helper for Circular Progress
const StatusCircle = ({ percentage, color, icon: Icon, label, statusText, subText }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
       <ArrowUpRight size={14} />
    </div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{label}</p>
    
    <div className="relative flex items-center justify-center mb-4">
      <svg className="w-20 h-20 transform -rotate-90">
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                strokeDasharray={226} strokeDashoffset={226 - (226 * percentage) / 100}
                className={color} strokeLinecap="round" />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center ${color.replace('stroke', 'text')}`}>
        <Icon size={24} />
      </div>
    </div>
    
    <h4 className="text-sm font-black text-gray-800">{statusText}</h4>
    <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-tighter">{subText}</p>
  </div>
);

const electricityRows = [
  { label: "Run Time Today", value: "0.00 Hours", badge: "Active", badgeCls: "bg-[#E8F5EE] text-[#007A3D]" },
  { label: "Last Peak Usage", value: "Never", badge: "—", badgeCls: "bg-gray-100 text-gray-500" },
  { label: "Total Run Hours", value: "0 Hours", badge: "OK", badgeCls: "bg-[#E8F5EE] text-[#007A3D]" },
  { label: "Last Maintenance", value: "Never", badge: "Check", badgeCls: "bg-orange-50 text-orange-600" },
  { label: "Last Sync", value: "18 April 2026, 07:16 PM", badge: null, badgeCls: "" },
];
const DeviceDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 122, 61, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 122, 61, 0)');

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["12 AM", "04 AM", "08 AM", "12 PM", "04 PM", "08 PM", "11 PM"],
        datasets: [
          {
            label: "Energy (kWh)",
            data: [45, 52, 38, 65, 48, 56, 42],
            borderColor: "#007A3D",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
          {
            label: "Motor Load",
            data: [30, 35, 25, 45, 32, 40, 33],
            borderColor: "#8DC63F",
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
          y: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { size: 10 } } }
        }
      },
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Status Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCircle label="System Power" percentage={100} color="stroke-[#007A3D]" icon={Zap} statusText="Running" subText="Active Status" />
        <StatusCircle label="Phase Integrity" percentage={100} color="stroke-blue-500" icon={RefreshCcw} statusText="Normal" subText="No Drift Detected" />
        <StatusCircle label="Trip Guard" percentage={0} color="stroke-gray-200" icon={AlertCircle} statusText="No Trip" subText="Safe Operation" />
        <StatusCircle label="Next Service" percentage={75} color="stroke-orange-400" icon={Clock} statusText="In 12 Days" subText="Due: 30 May" />
      </div>

      {/* 2. Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time Consumption Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 tracking-tight">Consumption Analytics</h3>
              <p className="text-xs text-gray-400 font-medium">Real-time vs Historical Load</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#007A3D] bg-green-50 px-2 py-1 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#007A3D]" /> Current
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Average
              </span>
            </div>
          </div>
          <div className="h-72">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Technical Specification & Metrics */}
        <div className="flex flex-col gap-4">
          {/* Main Meter */}
          <div className="bg-[#004d2a] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-green-900/20">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            <div className="flex justify-between items-start mb-8">
               <div className="p-2 bg-white/10 rounded-lg"><Activity size={20} className="text-[#8DC63F]" /></div>
               <span className="text-[10px] font-black tracking-widest bg-white/10 px-2 py-1 rounded">METER 01</span>
            </div>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Total Lifetime Usage</p>
            <h2 className="text-3xl font-black tracking-tighter mb-1">993,017,436<span className="text-sm text-[#8DC63F] ml-2">kWh</span></h2>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
               <div className="bg-[#8DC63F] h-full w-[85%] rounded-full shadow-[0_0_10px_#8DC63F]" />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Amperage</p>
                <p className="text-xl font-black text-gray-800">0.04 <span className="text-[10px] text-gray-400">A</span></p>
             </div>
             <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Wattage</p>
                <p className="text-xl font-black text-gray-800">0.42 <span className="text-[10px] text-gray-400">W</span></p>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Operational Log Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
           <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
             <Info size={16} className="text-[#007A3D]" /> Detailed Operational Logs
           </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-50">
           {electricityRows.map((row, idx) => (
             <div key={idx} className="p-5 hover:bg-gray-50 transition-colors">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{row.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-800">{row.value}</span>
                  {row.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${row.badgeCls}`}>
                      {row.badge}
                    </span>
                  )}
                </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default DeviceDashboard;