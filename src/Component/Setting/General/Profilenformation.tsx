
import { UserCircle2, } from "lucide-react";
import SettingsCard from "./FormFild/SettingsCard";
import InputField from "./FormFild/InputField";
// import SelectField from "./SelectField";
import UploadField from "./FormFild/UploadField";

import { useGetProfileQuery } from "../../../api/adminAuthApi"

const inputClassName =
    `
         cursor-not-allow
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


    const { data, isLoading } = useGetProfileQuery();

    if (isLoading) return <p>Loading...</p>;

    const user = data?.data;


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
                    value={user?.fullName}
                    readOnly

                />

                <InputField
                    className={inputClassName}
                    label=" Email"
                    type="email"
                    value={user?.email}
                />
                <InputField
                    className={inputClassName}
                    label="Phone Number"
                    value={user?.phone}
                    readOnly
                />


                <InputField
                    className={inputClassName}
                    label=" Status Typer"
                    type="status"
                    value={user?.status}
                    readOnly
                />



                <InputField
                    className={inputClassName}
                    label="Address"
                    value={`${user?.businessAddress},${user?.city},${user?.state},${user?.pincode}`}
                    readOnly
                />



                <InputField
                    className={inputClassName}
                    label="  Joined Date"
                    type="status"
                    value={
                        user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("en-IN")
                            : ""
                    } readOnly
                />



            </div>

            <div className="mt-0">
                <UploadField />
            </div>

        </SettingsCard>


    );
}


