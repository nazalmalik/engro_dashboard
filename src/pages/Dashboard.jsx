import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import HeroImage from "../assets/Heroimage.PNG";
import AboutImage from "../assets/aboutimage.PNG";
import ChartsSection from "../components/ChartsSection";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

// ─── COLORS ───
const COKE_RED = "#E41E26";
const COKE_DARK = "#B31217";
const GREEN = "#16a34a";
const AMBER = "#d97706";

// ─── TOOLTIP STYLE ───
const tooltipStyle = {
  contentStyle: {
    background: "#fff",
    borderRadius: 10,
    fontSize: 12,
    boxShadow: "0 4px 16px rgba(0,0,0,.08)",
  },
};

// ─── LEGEND ───
const LegendPill = ({ color, label }) => (
  <span className="flex items-center gap-1 text-xs text-gray-500">
    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
    {label}
  </span>
);

// ─── CARD ───
const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-4">
    <h3 className="text-sm font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

// ─── DATA ───
const zoneStats = {
  All: { total: 1200, working: 980, faulty: 120, off: 100, energy: 5400 },
  CBU: { total: 700, working: 600, faulty: 50, off: 50, energy: 3200 },
  SBU: { total: 500, working: 380, faulty: 70, off: 50, energy: 2200 },
};

const Dashboard = () => {
  const [zone, setZone] = useState("All");
  const current = zoneStats[zone];

  const statusData = [
    { name: "Working", value: current.working, fill: GREEN },
    { name: "Faulty", value: current.faulty, fill: COKE_RED },
    { name: "Offline", value: current.off, fill: AMBER },
  ];

  return (
    <DashboardLayout>

         {/* ───────── HEADING SECTION ───────── */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-5">
    Welcome to <span className="text-red-600">ChillCola</span> Analytics Dashboard
  </h1>
      
      {/* ───────── HERO SECTION ───────── */}
      <div
        className="w-full h-[560px] rounded-xl overflow-hidden shadow mb-10"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />


      {/* ───────── ZONE SELECTION ───────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Select Zone</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["All", "CBU", "SBU"].map((z) => (
            <div
              key={z}
              onClick={() => setZone(z)}
              className={`p-6 rounded-xl cursor-pointer border transition ${
                zone === z
                  ? "border-red-600 bg-red-50 shadow"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <h3 className="text-lg font-semibold">{z} Zone</h3>
              <p className="text-sm text-gray-500 mt-1">
                Click to view analytics
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ───────── KPI CARDS ───────── */}
      <div className="grid md:grid-cols-5 gap-6 mb-12">
        {[
          { label: "Total Devices", value: current.total },
          { label: "Working", value: current.working },
          { label: "Faulty", value: current.faulty },
          { label: "Offline", value: current.off },
          { label: "Energy Usage", value: current.energy + " kWh" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-5 rounded-xl shadow border"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-xl font-bold mt-1">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* ───────── MAIN CHARTS ───────── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">

        {/* PIE */}
        <ChartCard title="Device Status Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={90}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-3">
            <LegendPill color={GREEN} label="Working" />
            <LegendPill color={COKE_RED} label="Faulty" />
            <LegendPill color={AMBER} label="Offline" />
          </div>
        </ChartCard>

        {/* AREA */}
        <ChartCard title="Weekly Performance Trend">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={[
                { day: "Mon", value: 120 },
                { day: "Tue", value: 210 },
                { day: "Wed", value: 170 },
                { day: "Thu", value: 300 },
                { day: "Fri", value: 250 },
                { day: "Sat", value: 280 },
                { day: "Sun", value: 320 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={COKE_RED}
                fill={COKE_RED}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ───────── EXTRA ANALYTICS ───────── */}
      <div className="mb-12">
        <ChartsSection />
      </div>

      {/* ───────── ABOUT / INFO SECTION ───────── */}
    <div className="mb-2">
  <img
    src={AboutImage}
    alt="About"
    className="w-full h-[600px] object-cover rounded-xl shadow"
  />
</div>

    </DashboardLayout>
  );
};

export default Dashboard;