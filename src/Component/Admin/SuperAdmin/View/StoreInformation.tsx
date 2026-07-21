
import { Store } from "lucide-react";
import SettingsCard from "../Form/SettingsCard";
import InputField from "../Form/InputField";
import { Hooks } from "./Hooks";
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



  if (isLoading) return <p>Loading...</p>;
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
          value={formData.businessName}
          readOnly

        />

        <InputField
          className={inputClassName}
          label="Store  Type"
          type="businessType"
          value={formData.businessType}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Store Email"
          type="email"
          value={formData.email}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Store  Phone"
          value={formData.phone}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Store Address"
          value={formData.businessAddress}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" city"
          value={formData.city}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" state"
          value={formData.state}
          readOnly
        />
        <InputField
          className={inputClassName}
          label=" pincode"
          value={formData?.pincode}
          readOnly
        />
      </div>


      <div className="grid md:grid-cols-2 gap-2">

        <InputField
          className={inputClassName}
          label="Account Holder Name"
          type="accountHolderName"
          value={formData.accountHolderName}
          readOnly
        />
        <InputField
          className={inputClassName}
          label="Bank Name"
          type="bankName"
          value={formData.bankName}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="Account Number"
          type="accountNumber"
          value={formData.accountNumber}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="IFSC Code"
          value={formData.ifscCode}
          readOnly
        />

        <InputField
          className={inputClassName}
          label="GST Number"
          value={formData.gstNumber}
          readOnly
        />

        <InputField
          className={inputClassName}
          label=" Pan Number"
          value={formData.panNumber}
          readOnly
        />
        <InputField
          className={`${inputClassName} ${user.KYCVerified
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-red-700"
            }`}

          label=" KYC Details"
          value={formData.KYCVerified ? "Verified" : "Not Verified"}
          readOnly
        />
        <InputField
          className={`${inputClassName} ${user.accountMode
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-red-700"
            }`}
          label="Account Mode"
          value={formData.accountMode ? "Active" : "Inactive"}
          readOnly
        />
      </div>
    </SettingsCard>
  );
}