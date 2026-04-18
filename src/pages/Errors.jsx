import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

const errorRows = [
  { name: "Phase Loss Detected", phases: ["L1", "L2", "L3"], status: ["ok", "ok", "ok"] },
  { name: "Voltage Sag Threshold", phases: ["L1", "L2", "L3"], status: ["ok", "ok", "ok"] },
  { name: "Phase Sequence Mismatch", phases: ["L3"], status: ["ok"] },
  { name: "Current Sequence Anomaly", phases: ["L3"], status: ["ok"] },
];

const warningRows = [
  { name: "Total KW Direction Reversal", phases: ["L3"], status: ["ok"] },
  { name: "Total Kvar Direction Reversal", phases: ["L3"], status: ["ok"] },
  { name: "CF1 Direction Status", phases: ["L3"], status: ["ok"] },
  { name: "CF2 Direction Status", phases: ["L3"], status: ["warn"] },
  { name: "Neutral Current Threshold", phases: ["L3"], status: ["ok"] },
];

const statusStyles = {
  ok: { 
    bg: "bg-emerald-50", 
    text: "text-emerald-700", 
    dot: "bg-emerald-500", 
    border: "border-emerald-100" 
  },
  warn: { 
    bg: "bg-amber-50", 
    text: "text-amber-700", 
    dot: "bg-amber-500", 
    border: "border-amber-100" 
  },
  err: { 
    bg: "bg-red-50", 
    text: "text-red-700", 
    dot: "bg-red-500", 
    border: "border-red-100" 
  },
};

const ErrorSection = ({ title, rows, type }) => {
  const isError = type === "error";
  const Icon = isError ? ShieldAlert : AlertTriangle;
  const headerClass = isError 
    ? "bg-red-50 text-red-700 border-red-100" 
    : "bg-amber-50 text-amber-700 border-amber-100";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Section Header */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${headerClass}`}>
        <div className="flex items-center gap-2.5">
          <Icon size={18} />
          <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/50 border border-current/10">
          {rows.length} Parameters
        </span>
      </div>

      {/* Row List */}
      <div className="divide-y divide-gray-50">
        {rows.map((row) => (
          <div
            key={row.name}
            className="group flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                {row.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Diagnostic ID: SIG-882</span>
            </div>

            <div className="flex gap-2">
              {row.phases.map((ph, i) => {
                const style = statusStyles[row.status[i]];
                return (
                  <div
                    key={ph}
                    className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${style.bg} ${style.text} ${style.border}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${style.dot} ${row.status[i] !== 'ok' ? 'animate-pulse' : ''}`} />
                    {ph}
                    {row.status[i] === 'ok' && <CheckCircle2 size={10} className="ml-0.5 opacity-60" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Errors = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex items-center gap-3 px-1">
        <AlertCircle className="text-[#007A3D]" size={20} />
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Security & Integrity Monitor</h2>
          <p className="text-xs text-gray-400 font-medium">Real-time phase analysis and direction validation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorSection
          title="Critical Errors"
          rows={errorRows}
          type="error"
        />

        <ErrorSection
          title="System Warnings"
          rows={warningRows}
          type="warning"
        />
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-white p-1.5 rounded-md border border-gray-200 text-gray-400">
           <AlertCircle size={14} />
        </div>
        <p className="text-[11px] leading-relaxed text-gray-500 font-medium">
          <strong className="text-gray-700">Protocol Note:</strong> All statuses marked as <span className="text-emerald-600 font-bold">OK</span> indicate the system is operating within the defined nominal range. <span className="text-amber-600 font-bold">WARN</span> states should be investigated during the next scheduled maintenance cycle to prevent phase degradation.
        </p>
      </div>
    </div>
  );
};

export default Errors;