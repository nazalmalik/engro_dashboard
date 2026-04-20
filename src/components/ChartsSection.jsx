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
  Legend
} from "recharts";

const zoneData = [
  { name: "All", value: 120 },
  { name: "CBU", value: 80 },
  { name: "SBU", value: 60 }
];

const statusData = [
  { name: "Working", value: 70 },
  { name: "Faulty", value: 15 },
  { name: "Offline", value: 15 }
];

const COLORS = ["#F40009", "#16a34a", "#facc15", "#3b82f6"];

export default function ChartsSection() {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-14 overflow-hidden">

      {/* Coca-Cola background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative grid md:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Zone Performance Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={zoneData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#F40009" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}