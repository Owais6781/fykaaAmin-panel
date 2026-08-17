import { useGetContactQuery } from "../../../api/contact";

export default function ContactView() {
  const { data, isLoading } = useGetContactQuery();

  if (isLoading) return <h2>Loading...</h2>;

  const contact = data?.data;


return (
  <div className="max-w-5xl mx-auto mt-10">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 md:p-10">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Contact Information
        </h2>
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">

        {/* Company */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Support
          </p>
          <p className="text-base font-semibold text-slate-900">
            {contact.supportTitle || "Support"}
          </p>
        </div>

        {/* Address */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Address
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            {contact.address && <>{contact.address},<br /></>}
            {contact.city || contact.state ? `${contact.city || ""}, ${contact.state || ""}` : ""}
            {contact.pincode && <><br />{contact.pincode}</>}
            {!contact.address && !contact.city && !contact.state && !contact.pincode && "—"}
          </p>
        </div>

        {/* Phone */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Phone
          </p>
          <div className="text-sm text-slate-700 space-y-0.5">
            {contact.phone1 && <p>{contact.phone1}</p>}
            {contact.phone2 && <p className="text-slate-500">{contact.phone2}</p>}
            {!contact.phone1 && !contact.phone2 && <p>—</p>}
          </div>
        </div>

        {/* Email */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            Email
          </p>
          <div className="text-sm text-slate-700 space-y-0.5">
            {contact.email1 && <p className="font-medium text-slate-900">{contact.email1}</p>}
            {contact.email2 && <p className="text-slate-500">{contact.email2}</p>}
            {!contact.email1 && !contact.email2 && <p>—</p>}
          </div>
        </div>

    
        {/* Social Links */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
            Social Links
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <span className="text-xs text-slate-500 block">Facebook</span>
              <p className="text-sm text-slate-800 truncate">{contact.facebook || "—"}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Instagram</span>
              <p className="text-sm text-slate-800 truncate">{contact.instagram || "—"}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Twitter</span>
              <p className="text-sm text-slate-800 truncate">{contact.twitter || "—"}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Support Section */}
      {(contact.supportTitle || contact.supportDescription) && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6">
           <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-3">
            Support Description
          </p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {contact.supportDescription}
            </p>
          </div>
        </div>
      )}

    </div>
  </div>
);

}