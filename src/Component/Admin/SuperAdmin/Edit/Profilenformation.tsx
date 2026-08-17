

import { UserCircle2, } from "lucide-react";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import SettingsCard from "../Form/SettingsCard";
import UploadField from "../Form/UploadField";
import type { Payload } from "./Payload";



interface Props {
  formData: Payload;
  handleChange: (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}



const inputClassName =
    `
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

        
const businessTypeOptions = [
    "Pending",
    "Approved",
    "Rejected",

];

export default function ProfileInformation({
  formData,
  handleChange,
}: Props) {
  return (
        <SettingsCard
            rightIcon={<UserCircle2 className="text-indigo-600" />}
            leftIcon={""}
            title="Profile Information"
            description="Manage  your personal account information."
        >
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-1">

                <InputField
                    className={inputClassName}
                    label="Full Name"
                    type="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}


                />

                <InputField
                    className={inputClassName}
                    label=" Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}


                />
                <InputField
                    className={inputClassName}
                    label="Phone Number"
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}

                />

                <SelectField
                    className={inputClassName}
                    label="Status Typer"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                   options={businessTypeOptions}

                />
                <InputField
                    className={inputClassName}
                    label="Address"
                    type="businessAddress"
                    name="businessAddress"
                    value={`${formData.businessAddress},${formData.city},${formData.state}${formData.pincode}`}
                    onChange={handleChange}
                />
                <InputField
                    className={inputClassName}
                    label="Joined Date"
                    type="status"
                    name="status"
                    value={new Date(formData.createdAt).toLocaleDateString("en-IN")}

                />
            </div>

            <div className="mt-0">
                <UploadField />
            </div>
         
        </SettingsCard>


    );
}