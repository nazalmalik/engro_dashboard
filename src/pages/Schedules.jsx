import React, { useState } from "react";

const SchedulesPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="bg-white border border-[#007A3D]/10 rounded-xl overflow-hidden">

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#007A3D]/10">
          <p className="text-base font-semibold text-[#0D1F16]">
            All Schedules
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#007A3D] text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-[#005C2D] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            Add New Schedule
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0D1F16]">
              {[
                "Schedule",
                "Status",
                "Tag Phone",
                "Tag",
                "Start Time",
                "End Time",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[11px] font-semibold tracking-[0.8px] uppercase text-white/70"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={7}
                className="text-center text-[#7AA58A] py-10 text-[13px]"
              >
                No records found. Add a new schedule to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[440px] p-6">

            <h2 className="text-[17px] font-semibold text-[#0D1F16] mb-5">
              Add Schedule
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">

              <div>
                <label className="text-[12px] font-medium text-[#3D6B52] block mb-1.5">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full h-9 border border-[#007A3D]/20 rounded-lg px-3 text-[13px] text-[#0D1F16] outline-none focus:border-[#007A3D] transition-colors"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#3D6B52] block mb-1.5">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full h-9 border border-[#007A3D]/20 rounded-lg px-3 text-[13px] text-[#0D1F16] outline-none focus:border-[#007A3D] transition-colors"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#3D6B52] block mb-1.5">
                  Tag Name
                </label>
                <input
                  type="text"
                  placeholder="Tag Name"
                  className="w-full h-9 border border-[#007A3D]/20 rounded-lg px-3 text-[13px] placeholder:text-[#7AA58A] outline-none focus:border-[#007A3D] transition-colors"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#3D6B52] block mb-1.5">
                  Tag Phone
                </label>
                <input
                  type="text"
                  placeholder="Tag Phone"
                  className="w-full h-9 border border-[#007A3D]/20 rounded-lg px-3 text-[13px] placeholder:text-[#7AA58A] outline-none focus:border-[#007A3D] transition-colors"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-[#007A3D]/20 text-[13px] text-[#3D6B52] hover:bg-[#F7FAF8]"
              >
                Discard
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-[#007A3D] text-white text-[13px] font-medium hover:bg-[#005C2D]"
              >
                Submit
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulesPage;