import React from "react";
import {
  LayoutGrid,
  Cpu,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import EngroFavicon from "../../assets/favicon.jpg";

const navItems = [
  {
    section: "Main",
    items: [
      { id: "overview", label: "Overview", icon: LayoutGrid, path: "/overviewpage" },
      { id: "device", label: "Device Dashboard", icon: Cpu, path: "/devicedashboard" },
    ],
  },
  {
    section: "Management",
    items: [
      { id: "schedules", label: "Schedules", icon: Calendar, path: "/schedules" },
      { id: "history", label: "History", icon: Clock, path: "/history" },
      { id: "errors", label: "Errors", icon: AlertCircle, path: "/errors" },
    ],
  },
  {
    section: "Device",
    items: [
      { id: "details", label: "Details", icon: FileText, path: "/details" },
      { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-[#004d2a] flex flex-col fixed left-0 top-0 z-50 border-r border-white/5 shadow-2xl">

      {/* Branding Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 group cursor-pointer">

          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/40 border border-white/10 bg-[#FDFFFC] p-2.5">
            <img
              src={EngroFavicon}
              alt="Engro Icon"
              className="h-auto w-full object-contain mix-blend-multiply"
            />
          </div>

          <div>
            <h1 className="text-white font-black text-lg tracking-widest leading-none">
              engro
            </h1>
            <span className="text-[#8DC63F] text-[10px] font-bold tracking-[0.2em] uppercase">
              IoT Hub
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto">

        {navItems.map((group) => (
          <div key={group.section} className="space-y-1">

            <h3 className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-3">
              {group.section}
            </h3>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative
                    ${
                      isActive
                        ? "text-white bg-white/10 shadow-inner"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-[-4px] top-3 bottom-3 w-1.5 bg-[#8DC63F] rounded-r-full shadow-[0_0_15px_#8DC63F]" />
                      )}

                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive ? "text-[#8DC63F]" : "group-hover:text-white"
                        }`}
                      />

                      <span className="tracking-tight">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 bg-black/10 border-t border-white/5">
        <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8DC63F] flex items-center justify-center text-[#004d2a] font-bold border-2 border-[#004d2a]">
              ER
            </div>

            <div className="flex flex-col">
              <span className="text-white text-xs font-bold">Engr. Nazal</span>
              <span className="text-white/40 text-[10px] uppercase">
                Admin
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-white/30 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;