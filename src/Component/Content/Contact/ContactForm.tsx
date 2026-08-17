

import { useState } from "react";
import { useCreateContactMutation } from "../../../api/contact"
export default function ContactForm() {
  const [createContact, { isLoading, isError, },] = useCreateContactMutation();
  const [formData, setFormData] = useState({
   
    address: "",
    city: "",
    state: "",
    pincode: "",

    phone1: "",
    phone2: "",

    email1: "",
    email2: "",

    facebook: "",
    instagram: "",
    twitter: "",

    supportTitle: "",
    supportDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {

      await createContact(formData).unwrap()
      console.log("Contact Created");
// setFormData(formData)
    } catch (error) {
      console.log(error);
    }

  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>isError...</p>;
  return (
    <div className="max-w-5xl mx-auto bg-slate-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 md:p-10">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contact Information
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your company contact details, location, and social links.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              General Info
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
              <label className="block text-sm font-medium text-slate-700">
                Support Title
              </label>
              <input
                type="text"
                name="supportTitle"
                value={formData.supportTitle}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Location
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Phone Numbers
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Phone 1
                </label>
                <input
                  type="text"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Phone 2
                </label>
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Email Addresses
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email 1
                </label>
                <input
                  type="email"
                  name="email1"
                  value={formData.email1}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email 2
                </label>
                <input
                  type="email"
                  name="email2"
                  value={formData.email2}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Social Links
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Facebook URL
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Instagram URL
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Twitter URL
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Support Section
            </h3>

            

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Support Description
              </label>
              <textarea
                rows={4}
                name="supportDescription"
                value={formData.supportDescription}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 active:scale-[0.99]"
            >
              Save Contact Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}