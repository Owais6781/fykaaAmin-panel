
import { Store } from "lucide-react";
import SettingsCard from "../Form/SettingsCard";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import type { Payload } from "./Payload";



interface Props {
  formData: Payload;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
  "Individual",
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited",
  "Public Limited",
];



export default function StoreInformation({ formData,
  handleChange,

}: Props) {


  return (
    <SettingsCard
      rightIcon={<Store className="text-indigo-600" />}
      leftIcon={""}
      title="Store Information"
      description="Manage  your store details."

    >



      <div className="grid md:grid-cols-2 gap-2">

        <InputField
          className={inputClassName}
          label="Store  Name"
          type="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}

        />


        <SelectField
          className={inputClassName}
          label="Store  Type"
          name="businessName"
          value={formData.businessType}
          options={businessTypeOptions}

        />

        <InputField
          className={inputClassName}
          label="Store Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          className={inputClassName}
          label="Store  Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <InputField
          className={inputClassName}
          label="Store Address"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
        />
        <InputField
          className={inputClassName}
          label=" city"
          name="city"
          value={formData.city}
          onChange={handleChange}

        />
        <InputField
          className={inputClassName}
          label=" state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <InputField
          className={inputClassName}
          label=" pincode"
          name="pincode"
          value={formData?.pincode}
          onChange={handleChange}
        />



      </div>


      <div className="grid md:grid-cols-2 gap-2">



        <InputField
          className={inputClassName}
          label="Account Holder Name"
          type="accountHolderName"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}

        />
        <InputField
          className={inputClassName}
          label="Bank Name"
          type="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}

        />

        <InputField
          className={inputClassName}
          label="Account Number"
          type="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}

        />

        <InputField
          className={inputClassName}
          label="IFSC Code"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}

        />

        <InputField
          className={inputClassName}
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}

        />

        <InputField
          className={inputClassName}
          label=" Pan Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}

        />



        <InputField
          className={`${inputClassName} ${formData.accountMode
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-red-700"
            }`}


          label="Account Mode"
          value={formData.accountMode ? "Active" : "Suspended"}

        />

        <InputField
          className={`${inputClassName} ${formData.KYCVerified
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-red-700"
            }`}

          label=" KYC Details"
          value={formData.KYCVerified ? "Verified" : "Not Verified"}
        />


      </div>

      {/* <div className="mt-8">
                
                <UploadField />
            </div> */}

    </SettingsCard>
  );
}