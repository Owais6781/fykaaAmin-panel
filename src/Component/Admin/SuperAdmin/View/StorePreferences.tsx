
import { Settings } from "lucide-react";
import ToggleSwitch from "../Form/ToggleSwitch";
import SettingsCard from "../Form/SettingsCard";
import type { StorePreferencesProps } from "./ProfileProps";


export default function StorePreferences({
  formData,
  handleToggleSwitch,
}: StorePreferencesProps) {

  return (
    <SettingsCard
      title="Store Preferences"
      description="Configure general preferences for your store."
      rightIcon={<Settings className="text-indigo-600" size={22} />}
      leftIcon={""}
    >




      <ToggleSwitch
        label="Account Mode"
        description="Display seller account status  ."
        checked={formData.accountMode}
        onChange={handleToggleSwitch}
      />



      <ToggleSwitch
        label="KYC Details"
        description="Display seller verification details."
        checked={formData.KYCVerified}
        onChange={handleToggleSwitch}
      />







      <ToggleSwitch
        label="Vacation Mode"
        description="Hide your products from customers until you turn off Vacation Mode."
        checked={formData.vacationMode}
        onChange={handleToggleSwitch}
      />



      <ToggleSwitch
        label="Hide Out of Stock Products"
        description="Hide out-of-stock products from customers on the website."
        checked={formData.vacationMode}
        onChange={handleToggleSwitch}
      />



      {/* <ToggleSwitch
        label="Enable Reviews"
        description="Customers can write reviews."
        checked={formData.enableReviews}
        onChange={() => toggle("enableReviews")}
      /> */}
      {/* 
  
      <ToggleSwitch
        label="Product Rating"
        description="Display product ratings."
        checked={settings.productRating}
        onChange={() => toggle("productRating")}
      /> */}

    </SettingsCard>
  );
}