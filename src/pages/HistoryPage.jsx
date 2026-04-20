import React, { useState, useMemo } from "react";
import { 
  Search, 
  Copy, 
  FileSpreadsheet, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  History as HistoryIcon,
  Filter,
  Clock // <--- Add this line
} from "lucide-react";

const initialHistoryRows = [
  { status: "OFF", tag: "T-01", phone: "+92 300...", runtime: 0, energy: 0, date: "02-05-2023 12:39 PM", action: "Unknown 44" },
  { status: "OFF", tag: "T-02", phone: "+92 301...", runtime: 0, energy: 0, date: "02-05-2023 12:39 PM", action: "Trip error Removed" },
  { status: "ON", tag: "Admin", phone: "+92 333...", runtime: 45, energy: 0.34, date: "02-05-2023 12:39 PM", action: "Electricity Supply ON" },
  { status: "OFF", tag: "System", phone: "N/A", runtime: 0, energy: 0, date: "02-05-2023 12:39 PM", action: "Turned OFF Manually" },
  { status: "OFF", tag: "T-01", phone: "+92 300...", runtime: 0, energy: 0.34, date: "02-05-2023 12:40 PM", action: "Unknown 42" },
  { status: "OFF", tag: "T-01", phone: "+92 300...", runtime: 0, energy: 0.34, date: "02-05-2023 12:40 PM", action: "Unknown 42" },
  { status: "OFF", tag: "System", phone: "N/A", runtime: 0, energy: 0, date: "02-05-2023 12:40 PM", action: "Trip error Occurred" },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- LOGIC: SEARCH & FILTER ---
  const filteredData = useMemo(() => {
    return initialHistoryRows.filter((row) => {
      const matchesSearch = 
        row.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.action.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // --- LOGIC: EXPORT ACTIONS ---
  const handleCopy = () => {
    const text = filteredData.map(r => `${r.date} - ${r.tag} - ${r.action}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Data copied to clipboard!");
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Date,Tag,Status,Action"].concat(filteredData.map(r => `${r.date},${r.tag},${r.status},${r.action}`)).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "history_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#007A3D]/10 rounded-lg text-[#007A3D]">
            <HistoryIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1F16] tracking-tight">System Event Logs</h2>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Audit Trail & Operational History</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Action Buttons */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden mr-2">
            <button onClick={handleCopy} className="p-2.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100" title="Copy to Clipboard">
              <Copy size={16} />
            </button>
            <button onClick={handleExportExcel} className="p-2.5 bg-white hover:bg-gray-50 text-[#007A3D] transition-colors border-r border-gray-100" title="Export Excel">
              <FileSpreadsheet size={16} />
            </button>
            <button className="p-2.5 bg-white hover:bg-red-50 text-red-500 transition-colors" title="Export PDF">
              <FileText size={16} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007A3D] focus:ring-4 focus:ring-[#007A3D]/5 transition-all w-60"
            />
          </div>

          {/* Status Select */}
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 h-10">
            <Filter size={14} className="text-gray-400 mr-2" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm font-bold text-gray-600 outline-none bg-transparent cursor-pointer pr-2"
            >
              <option value="All">All Events</option>
              <option value="ON">Motor Starts</option>
              <option value="OFF">Motor Stops</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0D1F16]">
              {["Status", "Identity", "Runtime", "Energy (kWh)", "Timestamp", "Activity"].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-[10px] font-black tracking-[0.15em] uppercase text-white/50 border-b border-white/5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.length > 0 ? filteredData.map((row, i) => (
              <tr key={i} className="hover:bg-green-50/30 transition-colors group">
                {/* Status Column */}
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    row.status === "ON" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === "ON" ? "bg-emerald-500" : "bg-red-500"}`} />
                    {row.status}
                  </div>
                </td>

                {/* Identity Column */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">{row.tag}</span>
                    <span className="text-[11px] font-mono text-gray-400">{row.phone}</span>
                  </div>
                </td>

                {/* Runtime/Energy */}
                <td className="px-6 py-4 text-sm font-bold text-gray-600 font-mono">{row.runtime} <span className="text-[10px] text-gray-400">min</span></td>
                <td className="px-6 py-4 text-sm font-bold text-[#007A3D] font-mono">{row.energy}</td>

                {/* Timestamp */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} className="text-[#8DC63F]" />
                    <span className="text-xs font-semibold">{row.date}</span>
                  </div>
                </td>

                {/* Action By */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-bold group-hover:bg-white transition-colors">
                    {row.action}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Search size={40} className="text-gray-200" />
                    <p className="text-gray-400 font-medium italic">No logs found matching your criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Footer / Pagination */}
      <div className="flex items-center justify-between px-8 py-5 bg-gray-50/50 border-t border-gray-50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-gray-800">{filteredData.length}</span> entries
        </p>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-400 disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex gap-1">
            {[1, 2, 3].map((num) => (
              <button 
                key={num} 
                onClick={() => setCurrentPage(num)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === num 
                    ? "bg-[#007A3D] text-white shadow-lg shadow-green-900/20" 
                    : "bg-white border border-gray-200 text-gray-500 hover:border-[#007A3D]/30"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;