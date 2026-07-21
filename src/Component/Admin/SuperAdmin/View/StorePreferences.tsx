// import { useState } from "react";
import { Settings } from "lucide-react";
import ToggleSwitch from "../Form/ToggleSwitch";
import SettingsCard from "../Form/SettingsCard";
import { Hooks } from "./Hooks";
export default function StorePreferences() {
  const { formData,  handleToggleSwitch } = Hooks();
  // const [settings, setSettings] = useState({

  //   maintenanceMode: false,
  //   guestCheckout: true,
  //   enableReviews: true,
  //   enableWishlist: true,
  //   newsletter: false,
  //   productCompare: true,
  //   productRating: true,
  //   showOutOfStock: false,
  // });

  // const toggle = (key: keyof typeof formData) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };

  return (
    <SettingsCard
      title="Store Preferences"
      description="Configure general preferences for your store."
      rightIcon={<Settings className="text-indigo-600" size={22} />}
      leftIcon={""}
    >


      <ToggleSwitch
        label="Maintenance Mode"
        description="Enable maintenance mode for your store."
        checked={formData.vacationMode}
        // onChange={() => toggle("vacationMode")}
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
      {/* 
      <ToggleSwitch
        label="Show Out of Stock Products"
        description="Display unavailable products in the store."
        checked={settings.showOutOfStock}
        onChange={() => toggle("showOutOfStock")}
      /> */}
    </SettingsCard>
  );
}