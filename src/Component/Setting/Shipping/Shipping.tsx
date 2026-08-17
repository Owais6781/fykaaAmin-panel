import { Truck, Save, PackageCheck } from "lucide-react";

const couriers = [
  {
    name: "Blue Dart",
    charge: "120",
    delivery: "2 - 3 Days",
    enabled: true,
  },
  {
    name: "DTDC",
    charge: "80",
    delivery: "3 - 5 Days",
    enabled: true,
  },
  {
    name: "Delhivery",
    charge: "90",
    delivery: "2 - 4 Days",
    enabled: true,
  },
  {
    name: "XpressBees",
    charge: "100",
    delivery: "2 - 5 Days",
    enabled: false,
  },
  {
    name: "India Post (Speed Post)",
    charge: "60",
    delivery: "5 - 7 Days",
    enabled: true,
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen bg-slate-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Courier Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your active courier partners, delivery timeframes, and shipping charges.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition duration-200 self-start sm:self-auto">
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Default Courier Selection */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <PackageCheck size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-slate-800">
                Primary Carrier
              </h2>
              <p className="text-xs text-slate-400">
                Select the preferred courier partner for automatic order assignment.
              </p>
            </div>
          </div>

          <div className="max-w-md">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Default Courier
            </label>
            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option>Blue Dart</option>
              <option>DTDC</option>
              <option>Delhivery</option>
              <option>XpressBees</option>
              <option>India Post (Speed Post)</option>
            </select>
          </div>
        </div>

        {/* Courier Cards List */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Available Courier Partners
          </h2>

          {couriers.map((courier) => (
            <div
              key={courier.name}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:border-slate-300 transition duration-200"
            >
              {/* Card Header & Toggle */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Truck size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {courier.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manual Courier Integration
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                    {courier.enabled ? "Active" : "Disabled"}
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={courier.enabled}
                    className="w-5 h-5 accent-indigo-600 rounded border-slate-300 cursor-pointer"
                  />
                </label>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Shipping Charge (₹)
                  </label>
                  <input
                    defaultValue={courier.charge}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Estimated Delivery
                  </label>
                  <input
                    defaultValue={courier.delivery}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Internal Notes
                  </label>
                  <input
                    placeholder="Optional details..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 placeholder:text-slate-400 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-2">
          <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition duration-200">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}