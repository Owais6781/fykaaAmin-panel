// import { useState } from "react";
import { Settings } from "lucide-react";
import ToggleSwitch from "../Form/ToggleSwitch";
import SettingsCard from "../Form/SettingsCard";
import type { Payload } from "./Payload";


interface Props {
  formData: Payload;
  setFormData: React.Dispatch<React.SetStateAction<Payload>>;
}




export default function StorePreferences({
  formData,
  setFormData,
}: Props) {

  const toggle = (key: "accountMode" | "KYCVerified" | "vacationMode"|"hideOutOfStock") => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsCard
      title="Store Preferences"
      description="Manage your store settings and general preferences."
      rightIcon={<Settings className="text-indigo-600" size={22} />}
      leftIcon={""}
    >



      <ToggleSwitch
        label="Account Mode"
        description="Display seller account status  ."
        checked={formData.accountMode}
        onChange={() => toggle("accountMode")}
      />



      <ToggleSwitch
        label="KYC Details"
        description="Display seller verification details."
        checked={formData.KYCVerified}
        onChange={() => toggle("KYCVerified")}
      />






      <ToggleSwitch
        label="Vacation Mode"
        description="Hide your products from customers until you turn off Vacation Mode."
        checked={formData.vacationMode}
        onChange={() => toggle("vacationMode")}
      />

      <ToggleSwitch
        label="Hide Out of Stock Products"
        description="Hide out-of-stock products from customers on the website."
        checked={formData.hideOutOfStock}
        onChange={() => toggle("hideOutOfStock")}
      />
    </SettingsCard>
  );
}