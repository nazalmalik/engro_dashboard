import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const pageMeta = {
  overviewpage: {
    title: "System Overview",
    sub: "Tube Well Network · RemoteWell",
  },
  devicedashboard: {
    title: "Device Dashboard ",
    sub: "Real-time monitoring & consumption",
  },
  schedules: {
    title: "Schedules",
    sub: "Manage pump scheduling",
  },
  history: {
    title: "History Details",
    sub: "Operational log & event records",
  },
  errors: {
    title: "Errors & Warnings",
    sub: "Fault monitoring & diagnostics",
  },
  details: {
    title: "Device Details",
    sub: "Technical specifications & analysis",
  },
};

const DashboardLayout = () => {
  const location = useLocation();

  // extract route name
  const path = location.pathname.replace("/", "") || "overviewpage";

  // get meta safely
  const meta = pageMeta[path] || pageMeta.overviewpage;

  return (
    <div className="sticky top-0 h-screen bg-[#F7FAF8]">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="ml-60 flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 bg-white border-b border-[#007A3D]/10 flex items-center px-7 sticky top-0 z-40">

          {/* Title + Subtitle (DYNAMIC) */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-[#0D1F16]">
              {meta.title}
            </h1>

            <span className="text-xs text-[#7AA58A] border-l pl-3 border-[#007A3D]/20">
              {meta.sub}
            </span>
          </div>

          {/* Spacer */}
          <div className="ml-auto flex items-center gap-2.5">

            {/* Bell */}
            <button className="relative w-9 h-9 rounded-lg border border-[#007A3D]/12 bg-white flex items-center justify-center">
              🔔
            </button>

            {/* Grid */}
            <button className="w-9 h-9 rounded-lg border border-[#007A3D]/12 bg-white flex items-center justify-center">
              ⬜
            </button>

            {/* Settings */}
            <button className="w-9 h-9 rounded-lg border border-[#007A3D]/12 bg-white flex items-center justify-center">
              ⚙️
            </button>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-7">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;