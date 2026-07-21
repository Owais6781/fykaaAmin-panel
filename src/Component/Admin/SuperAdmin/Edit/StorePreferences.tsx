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

  const toggle = (key: "accountMode" | "KYCVerified" | "vacationMode") => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsCard
      title="Store Preferences"
      description="Configure general preferences for your store."
      rightIcon={<Settings className="text-indigo-600" size={22} />}
      leftIcon={""}
    >


      <ToggleSwitch
        label="KYC Details"
        description="Display seller verification details."
        checked={formData.KYCVerified}
        onChange={() => toggle("KYCVerified")}
      />




      <ToggleSwitch
        label="Account Mode"
        description="Display seller account status  ."
        checked={formData.accountMode}
        onChange={() => toggle("accountMode")}
      />



      <ToggleSwitch
        label="Vacation Mode"
        description="Hide your products from customers until you turn off Vacation Mode."
        checked={formData.vacationMode}
        onChange={() => toggle("vacationMode")}
      />


      {/* 
  <ToggleSwitch
        label="Enable Reviews"
        description="Customers can write reviews."
        checked={settings.enableReviews}
        onChange={() => toggle("enableReviews")}
      />

    
      <ToggleSwitch
        label="Product Rating"
        description="Display product ratings."
        checked={settings.productRating}
        onChange={() => toggle("productRating")}
      />

      <ToggleSwitch
        label="Show Out of Stock Products"
        description="Display unavailable products in the store."
        checked={settings.showOutOfStock}
        onChange={() => toggle("showOutOfStock")}
      /> */}
    </SettingsCard>
  );
}