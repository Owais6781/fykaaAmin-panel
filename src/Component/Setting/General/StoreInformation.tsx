
import { Store } from "lucide-react";
import SettingsCard from "./FormFild/SettingsCard";
import InputField from "./FormFild/InputField";
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

type Props = {
  user: any;
};


export default function StoreInformation({user}:Props) {
  return (
    <SettingsCard
      rightIcon={<Store className="text-indigo-600" />}
      leftIcon={""}
      title="Store Information"
      description="Update your store details."
    >
      <div className="grid md:grid-cols-2 gap-2">

        <InputField
          className={inputClassName}
          label="Store  Name"
          type="businessName"
          value={user?.businessName}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Store  Type"
          type="businessType"
          value={user?.businessType}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="Store Email"
          type="email"
          value={user?.email}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="Store  Phone"
          value={user?.phone}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="Store Address"
          value={user?.businessAddress}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" city"
          value={user?.city}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" state"
          value={user?.state}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" pincode"
          value={user?.pincode}
          readOnly
        />
        {/* <InputField
                    label="GST NO"
                    value={user?.gstNumber}
                /> */}
        {/* <InputField
                    label="PAN NO"
                    value={user?.panNumber}
                />  <InputField
                    label="Store Address"
                    value="123 Main Street, Mumbai"
                /> */}


      </div>


      <div className="grid md:grid-cols-2 gap-2">

        <InputField
          className={inputClassName}
          label="Account Holder Name"
          type="accountHolderName"
          value={user?.accountHolderName}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Bank Name"
          type="bankName"
          value={user?.bankName}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="Account Number"
          type="accountNumber"
          value={user?.accountNumber}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="IFSC Code"
          value={user?.ifscCode}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="GST Number"
          value={user?.gstNumber}
          readOnly
        />

        <InputField
          className={inputClassName}
          label=" Pan Number"
          value={user?.panNumber}
          readOnly
        />


          <InputField
           className={`${inputClassName} ${user?.accountMode
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-red-700"
            }`}
       
          label="Account Mode"
          value={user?.accountMode ? "Active" : "Suspended"}
          readOnly

        />
        <InputField
          className={`${inputClassName} ${user?.KYCVerified
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
            }`}

          label=" KYC Details"
          value={user?.KYCVerified ? "Verified" : "Not Verified"}
          readOnly
        />
      

      </div>

      {/* <div className="mt-8">
                
                <UploadField />
            </div> */}

    </SettingsCard>
  );
}