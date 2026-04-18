import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

const Devices = () => {
const [devices, setDevices] = useState([
  {
    deviceId: "DEV-1001",
    status: "Online",
    fridge: "FR-LHR-1",
    zone: "CBU",
    temp: 5,
    power: "ON",
    lastSeen: "Now",
  },
  {
    deviceId: "DEV-1002",
    status: "Offline",
    fridge: null,
    zone: "-",
    temp: null,
    power: "OFF",
    lastSeen: "5 mins ago",
  },
  {
    deviceId: "DEV-1003",
    status: "Online",
    fridge: "FR-FSD-2",
    zone: "CBU",
    temp: 8,
    power: "ON",
    lastSeen: "1 min ago",
  },
  {
    deviceId: "DEV-1004",
    status: "Online",
    fridge: "FR-ISB-3",
    zone: "CBU",
    temp: 4,
    power: "ON",
    lastSeen: "30 sec ago",
  },
  {
    deviceId: "DEV-1005",
    status: "Offline",
    fridge: "FR-LHR-4",
    zone: "CBU",
    temp: null,
    power: "OFF",
    lastSeen: "10 mins ago",
  },
  {
    deviceId: "DEV-1006",
    status: "Online",
    fridge: "FR-KHI-1",
    zone: "SBU",
    temp: 6,
    power: "ON",
    lastSeen: "Now",
  },
  {
    deviceId: "DEV-1007",
    status: "Online",
    fridge: "FR-HYD-2",
    zone: "SBU",
    temp: 9,
    power: "ON",
    lastSeen: "2 mins ago",
  },
  {
    deviceId: "DEV-1008",
    status: "Offline",
    fridge: "FR-QTA-3",
    zone: "SBU",
    temp: null,
    power: "OFF",
    lastSeen: "15 mins ago",
  },
  {
    deviceId: "DEV-1009",
    status: "Online",
    fridge: "FR-KHI-4",
    zone: "SBU",
    temp: 7,
    power: "ON",
    lastSeen: "45 sec ago",
  },
  {
    deviceId: "DEV-1010",
    status: "Online",
    fridge: "FR-FSD-5",
    zone: "CBU",
    temp: 10,
    power: "ON",
    lastSeen: "3 mins ago",
  },
  {
    deviceId: "DEV-1011",
    status: "Offline",
    fridge: null,
    zone: "-",
    temp: null,
    power: "OFF",
    lastSeen: "25 mins ago",
  },
]);

  const [search, setSearch] = useState("");

  // 🔥 LIVE SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((d) => ({
          ...d,
          temp:
            d.status === "Online"
              ? Math.floor(Math.random() * 10)
              : null,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔍 FILTER
  const filtered = devices.filter((d) =>
    d.deviceId.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 KPI
  const online = devices.filter((d) => d.status === "Online").length;
  const offline = devices.filter((d) => d.status === "Offline").length;
  const unassigned = devices.filter((d) => !d.fridge).length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Device Management
            </h1>
            <p className="text-gray-500">
              Real-time IoT device monitoring system
            </p>
          </div>

          <input
            placeholder="Search device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <KPI title="Online Devices" value={online} color="green" />
          <KPI title="Offline Devices" value={offline} color="red" />
          <KPI title="Unassigned Devices" value={unassigned} color="yellow" />

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* TABLE HEADER */}
          <div className="bg-red-600 text-white px-6 py-4 font-semibold">
            Device Monitoring Panel
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-5 py-3">Device</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Temp</th>
                  <th className="px-5 py-3">Power</th>
                  <th className="px-5 py-3">Fridge</th>
                  <th className="px-5 py-3">Zone</th>
                  <th className="px-5 py-3">Health</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {filtered.map((d, i) => {
                  const health =
                    d.status === "Offline"
                      ? "Critical"
                      : d.temp > 8
                      ? "Warning"
                      : "Good";

                  return (
                    <tr key={i} className="hover:bg-red-50 transition">

                      {/* DEVICE ID */}
                      <td className="px-5 py-3 font-semibold text-gray-800">
                        {d.deviceId}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            d.status === "Online"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>

                      {/* TEMP */}
                      <td className="px-5 py-3 font-medium">
                        {d.temp !== null ? (
                          <span
                            className={
                              d.temp > 8
                                ? "text-red-600 font-bold"
                                : "text-blue-600"
                            }
                          >
                            {d.temp}°C
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* POWER */}
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            d.power === "ON"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {d.power}
                        </span>
                      </td>

                      {/* FRIDGE */}
                      <td className="px-5 py-3">
                        {d.fridge ? (
                          d.fridge
                        ) : (
                          <span className="text-yellow-600 font-medium">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* ZONE */}
                      <td className="px-5 py-3">{d.zone}</td>

                      {/* HEALTH */}
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            health === "Good"
                              ? "bg-green-100 text-green-600"
                              : health === "Warning"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {health}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-3">
                        {!d.fridge && (
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs">
                            Assign Device
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// KPI COMPONENT
const KPI = ({ title, value, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
};

export default Devices;