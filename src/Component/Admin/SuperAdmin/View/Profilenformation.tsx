
import { UserCircle2,Package } from "lucide-react";
import SettingsCard from "../Form/SettingsCard";
import InputField from "../Form/InputField";
import UploadField from "../Form/UploadField";

import {Hooks} from "./Hooks"

const inputClassName =
    `
       cursor-not-allowed
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          py-2
          text-sm
          text-gray-700
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
         hover:border-indigo-300 
        `

export default function StoreInformation() {

     const { formData, user, isLoading } = Hooks();

   


      if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={28} className="text-purple-600" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading ...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }


    return (
        <SettingsCard
            rightIcon={<UserCircle2 className="text-indigo-600" />}
            leftIcon={""}
            title="Profile Information"
            description="Manage your personal account information."
        >
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-1">

                <InputField
                    className={inputClassName}
                    label="Full Name"
                    type="fullName"
                    value={formData.fullName}
                    readOnly

                />

                <InputField
                    className={inputClassName}
                    label=" Email"
                    type="email"
                    value={formData.email}
                    readOnly

                />
                <InputField
                    className={inputClassName}
                    label="Phone Number"
                    value={formData.phone}
                    readOnly

                />

                <InputField
                    className={inputClassName}
                    label="Status Typer"
                    value={formData.status}
                    readOnly

                />
                <InputField
                    className={inputClassName}
                    label="Address"
                    value={`${formData.businessAddress},${formData.city},${formData.state}${formData.pincode}`}
                    readOnly


                />
                <InputField
                    className={inputClassName}
                    label="  Joined Date"
                    type="status"
                    value={new Date(user.createdAt).toLocaleDateString("en-IN")}
                    readOnly
                />
            </div>

            <div className="mt-0">
                <UploadField />
            </div>

        </SettingsCard>


    );
}


