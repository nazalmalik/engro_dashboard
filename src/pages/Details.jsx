import React from "react";

const mechSpecs = [
  { label: "Pump Type", value: "Centrifugal" },
  { label: "Head Size", value: "8.4 ~ 249m" },
  { label: "Flow Rate", value: "0 ~ 2.8 m³/h" },
];

const statusInfo = [
  { label: "Status", value: "ON", highlight: true },
  { label: "Running Time", value: "4 hours" },
  { label: "Total Running Time", value: "1,024 hours" },
];

const electricalSpecs = [
  { label: "Transformer Rating", value: "60 kVA" },
  { label: "Motor Rating", value: "50 kVA" },
  { label: "Motor Current", value: "135 Amp" },
  { label: "Motor RPM", value: "1450" },
  { label: "Motor Voltage", value: "415 V" },
];

const maintenanceInfo = [
  { label: "Installation Date", value: "04-03-2023" },
  { label: "Last Maintenance", value: "05-03-2023" },
  { label: "Due Maintenance", value: "04-04-2023", warn: true },
];

const waterAnalysis = [
  { label: "Cond (µs/cm)", value: "60 kVA" },
  { label: "Ca (ppm)", value: "50 kVA" },
  { label: "Mg (ppm)", value: "135 Amp" },
  { label: "So (ppm)", value: "1450" },
  { label: "Cl (ppm)", value: "415 V" },
];

// 🔹 Reusable Card Component (RAFCE)
const SpecCard = ({ title, rows, children }) => {
  return (
    <div className="bg-white border border-[#007A3D]/10 rounded-xl p-5">

      <p className="text-[14px] font-semibold text-[#007A3D] mb-4">
        {title}
      </p>

      {children || (
        <div className="flex flex-col">

          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between py-2.5 text-[13px] ${
                i < rows.length - 1
                  ? "border-b border-[#007A3D]/08"
                  : ""
              }`}
            >
              <span className="text-[#7AA58A]">
                {row.label}
              </span>

              <span
                className={`font-mono font-semibold ${
                  row.highlight
                    ? "text-[#007A3D]"
                    : row.warn
                    ? "text-orange-500"
                    : "text-[#007A3D]"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

// 🔹 Main Component (RAFCE)
const Details = () => {
  return (
    <div className="flex flex-col gap-4">

      <p className="text-[17px] font-semibold text-[#0D1F16]">
        Tube Well No:{" "}
        <span className="text-[#007A3D]">P-254 D</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        <SpecCard title="Mechanical Specification" rows={mechSpecs} />
        <SpecCard title="Status" rows={statusInfo} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SpecCard title="Electrical Specification" rows={electricalSpecs} />
        <SpecCard title="Maintenance & Installation" rows={maintenanceInfo} />
        <SpecCard title="Well Water Analysis" rows={waterAnalysis} />
      </div>

    </div>
  );
};

export default Details;