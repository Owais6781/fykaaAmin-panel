
import { UserCircle2,} from "lucide-react";
import SettingsCard from "../Form/SettingsCard";
import InputField from "../Form/InputField";
import UploadField from "../Form/UploadField";
import type { ProfileProps } from "./ProfileProps";

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

export default function StoreInformation({user}:ProfileProps) {
    return (
        <SettingsCard
            rightIcon={<UserCircle2 className="text-indigo-600" />}
            leftIcon={""}
            title="Profile Information"
            description="Review  your personal account information."
        >
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-1">

                <InputField
                    className={inputClassName}
                    label="Full Name"
                    type="fullName"
                    value={user.fullName}
                    readOnly

                />

                <InputField
                    className={inputClassName}
                    label=" Email"
                    type="email"
                    value={user.email}
                    readOnly

                />
                <InputField
                    className={inputClassName}
                    label="Phone Number"
                    value={user.phone}
                    readOnly

                />

                <InputField
                    className={inputClassName}
                    label="Status Typer"
                    value={user.status}
                    readOnly

                />
                <InputField
                    className={inputClassName}
                    label="Address"
                    value={`${user.businessAddress},${user.city},${user.state}${user.pincode}`}
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
                <UploadField 
                     disabled={true}
                    label="Store Logo"
                    value={""}
                    onChange={() => {
                        
                       ;
                    }}
                />
            </div>

        </SettingsCard>


    );
}


