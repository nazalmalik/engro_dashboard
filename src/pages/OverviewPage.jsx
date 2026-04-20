import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Zap,
    PowerOff,
    AlertTriangle,
    Activity,
    BarChart3,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    ChevronRight
} from "lucide-react";

// --- Data Structures ---
const statCards = [
    { id: 'total', label: "Total Devices", value: "68", sub: "Running: 61", icon: Activity, color: "text-[#007A3D]", bg: "bg-green-50", border: "border-t-[#007A3D]" },
    { id: 'off', label: "Stopped", value: "5", sub: "Status: Normal", icon: PowerOff, color: "text-red-600", bg: "bg-red-50", border: "border-t-red-500" },
    { id: 'trip', label: "Trip", value: "2", sub: "Status: Critical", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50", border: "border-t-orange-500" },
    { id: 'fault', label: "Fault", value: "2", sub: "Mechanical Issues", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", border: "border-t-amber-400" },
    { id: 'units', label: "Total Units", value: "2,065,545", sub: "kWh Consumed", icon: BarChart3, color: "text-blue-700", bg: "bg-blue-50", border: "border-t-blue-600" },
];

const initialDevices = [
    { name: "P-254 A", status: "ON", hours: 120, units: 100 },
    { name: "P-254 B", status: "ON", hours: 98, units: 85 },
    { name: "P-254 C", status: "OFF", hours: 145, units: 112 },
    { name: "P-254 D", status: "ON", hours: 210, units: 190 },
    { name: "P-254 E", status: "OFF", hours: 45, units: 30 },
    { name: "Pump #6", status: "STDBY", hours: 12, units: 5 },
    { name: "Pump #7", status: "STDBY", hours: 0, units: 0 },
    { name: "Pump #8", status: "ON", hours: 320, units: 280 },
];

const statusConfig = {
    ON: { pill: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", border: "border-l-emerald-500" },
    OFF: { pill: "bg-red-100 text-red-700", dot: "bg-red-500", border: "border-l-red-500" },
    STDBY: { pill: "bg-orange-100 text-orange-700", dot: "bg-orange-500", border: "border-l-orange-400" },
};

const OverviewPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");

    // ✅ ADDED: navigation hook
    const navigate = useNavigate();

    // --- Logic: Filtering ---
    const filteredDevices = useMemo(() => {
        return initialDevices.filter(device => {
            const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterStatus === "ALL" || device.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filterStatus]);

    // --- Logic: Export to CSV ---
    const handleExport = () => {
        const headers = ["Device Name,Status,Hours,Units (kWh)\n"];
        const rows = filteredDevices.map(d => `${d.name},${d.status},${d.hours},${d.units}\n`);
        const blob = new Blob([...headers, ...rows], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Engro_Device_Report_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    return (
        
        <div className="flex flex-col gap-8 p-2">    
                {/* 1. TOP STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-[-10px]">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`bg-white border border-gray-100 rounded-2xl p-5 border-t-4 ${card.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <MoreHorizontal size={16} className="text-gray-300 cursor-pointer hover:text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        {card.label}
                                    </p>
                                    <h3 className={`text-2xl font-black tracking-tight ${card.color}`}>
                                        {card.value}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">{card.sub}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 2. ACTIONS & FILTERS BAR */}
                <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-2 mt-[-20px]">
                    <div className="flex items-center gap-4 flex-1 min-w-[300px]">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by device ID or name..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007A3D] focus:ring-4 focus:ring-green-500/5 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                            <Filter size={14} className="text-gray-400" />
                            <select
                                className="bg-transparent text-sm font-semibold text-gray-600 outline-none cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="ON">Online</option>
                                <option value="OFF">Offline</option>
                                <option value="STDBY">Standby</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-[#007A3D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#005c2d] shadow-lg shadow-green-900/10 active:scale-95 transition-all"
                        >
                            <Download size={16} />
                            Export Data
                        </button>
                    </div>
                </div>

                {/* 3. DEVICE GRID */}
                <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-lg font-bold text-[#0D1F16] flex items-center gap-2 mt-[-20px]">
                            Network Infrastructure
                            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {filteredDevices.length} Items
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredDevices.map((device) => {
                            const cfg = statusConfig[device.status];

                            return (
                                <div
                                    key={device.name}
                                    onClick={() => navigate(`/device/${encodeURIComponent(device.name)}`)}  // ✅ ONLY ADDED LINE
                                    className={`bg-white border border-gray-100 border-l-4 ${cfg.border} rounded-2xl p-5 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer group relative overflow-hidden`}
                                >
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={16} className="text-gray-300" />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">System ID</p>
                                                <h4 className="text-base font-black text-gray-800">{device.name}</h4>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider ${cfg.pill}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                                                {device.status}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                                                <span className="text-[11px] font-semibold text-gray-400">Run Time</span>
                                                <span className="text-xs font-mono font-bold text-gray-700">{device.hours}h</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                                                <span className="text-[11px] font-semibold text-gray-400">Total Load</span>
                                                <span className="text-xs font-mono font-bold text-gray-700">{device.units} kWh</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {filteredDevices.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <Search className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-500 font-medium">No devices match your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
            );
};

            export default OverviewPage;