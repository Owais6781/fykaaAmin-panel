import { Bell, Mail, Smartphone, ShieldCheck, Save, SlidersHorizontal } from "lucide-react";

export default function Notification() {
  return (
    <div className="min-h-screen bg-slate-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Notification Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure delivery preferences for email, SMS, push notifications, and system alerts.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition duration-200 self-start sm:self-auto">
            <Save size={18} />
            Save Settings
          </button>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 bg-slate-50/40">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Email Notifications</h2>
              <p className="text-xs text-slate-400">Manage order updates and account emails sent to customers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 p-6">
            {[
              "Order Placed",
              "Order Shipped",
              "Order Delivered",
              "Order Cancelled",
              "Refund Processed",
              "New Customer Registration",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50/80 cursor-pointer transition duration-150"
              >
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 bg-slate-50/40">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60">
              <Smartphone size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">SMS Notifications</h2>
              <p className="text-xs text-slate-400">Configure transactional and promotional text messaging.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 p-6">
            {[
              "Order Placed",
              "Order Shipped",
              "Out For Delivery",
              "Order Delivered",
              "Promotional SMS",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50/80 cursor-pointer transition duration-150"
              >
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <input
                  type="checkbox"
                  defaultChecked={item !== "Promotional SMS"}
                  className="w-4 h-4 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 bg-slate-50/40">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Push Notifications</h2>
              <p className="text-xs text-slate-400">Mobile app and browser alert triggers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 p-6">
            {[
              "New Order",
              "Low Stock Alert",
              "Payment Received",
              "Customer Review",
              "Seller Registration",
              "Coupon Expired",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50/80 cursor-pointer transition duration-150"
              >
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Admin Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 bg-slate-50/40">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Admin Alerts</h2>
              <p className="text-xs text-slate-400">Critical system warnings and operational triggers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 p-6">
            {[
              "New Order Alert",
              "Low Inventory",
              "Failed Payment",
              "New Seller Registration",
              "Customer Complaint",
              "Return Request",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50/80 cursor-pointer transition duration-150"
              >
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Global Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 bg-slate-50/40">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/60">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Notification Preferences
              </h2>
              <p className="text-xs text-slate-400">Configure global dispatch frequencies and sound alerts.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 p-6">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Notification Sound
              </label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Email Frequency
              </label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option>Instant</option>
                <option>Hourly Digest</option>
                <option>Daily Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Auto Delete Notifications
              </label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option>30 Days</option>
                <option>60 Days</option>
                <option>90 Days</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-2">
          <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition duration-200">
            <Save size={18} />
            Save Notification Settings
          </button>
        </div>

      </div>
    </div>
  );
}