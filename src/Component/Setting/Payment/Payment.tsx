import { Eye, EyeOff, ShieldCheck, Wallet, RefreshCw, Settings2 } from "lucide-react";
import { useState } from "react";

export default function Payment() {
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/30 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Razorpay Settings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure and manage your Razorpay payment gateway integration.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Connected
          </span>
        </div>

        {/* Gateway Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Wallet size={20} />
            </div>
            <h2 className="font-semibold text-lg text-slate-800">
              Gateway Status
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Gateway
              </label>
              <input
                readOnly
                value="Razorpay"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50/60 text-sm font-medium text-slate-700 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Environment
              </label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                <option>Test Mode</option>
                <option>Live Mode</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-semibold text-lg text-slate-800">
              API Credentials
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Key ID
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  defaultValue="rzp_live_xxxxxxxxxxxxxx"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Secret Key
              </label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  defaultValue="rzp_secret_xxxxxxxxx"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Webhook Secret
              </label>
              <input
                defaultValue="whsec_xxxxxxxxxxxxx"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Order Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Settings2 size={20} />
            </div>
            <h2 className="font-semibold text-lg text-slate-800">
              Payment Rules
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Minimum Order (₹)
              </label>
              <input
                defaultValue="100"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                COD Limit (₹)
              </label>
              <input
                defaultValue="5000"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Auto Cancel Window
              </label>
              <input
                defaultValue="30 Minutes"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-lg text-slate-800 mb-5">
            Supported Payment Methods
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "UPI",
              "Cards",
              "Net Banking",
              "Wallet",
              "EMI",
              "Pay Later",
              "International",
              "COD",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50/80 cursor-pointer transition duration-150"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-xl text-sm transition duration-200">
            <RefreshCw size={16} className="text-slate-500" />
            Test Connection
          </button>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition duration-200">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}