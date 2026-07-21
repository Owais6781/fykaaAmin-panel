import { useState } from "react";
import { Settings } from "lucide-react";
import ToggleSwitch from "./FormFild/ToggleSwitch";
import SettingsCard from "./FormFild/SettingsCard";


export default function StorePreferences() {



  const [settings, setSettings] = useState({

    maintenanceMode: false,
    guestCheckout: true,
    enableReviews: true,
    enableWishlist: true,
    newsletter: false,
    productCompare: true,
    productRating: true,
    showOutOfStock: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
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
        label="Maintenance Mode"
        description="Enable maintenance mode for your store."
        checked={settings.maintenanceMode}
        onChange={() => toggle("maintenanceMode")}
      />
{/* 

<ToggleSwitch
        label="Vacation Mode"
        description="Hide your products from customers until you turn off Vacation Mode."
        checked={formData.vacationMode}
        onChange={() => toggle("vacationMode")}
      />

 */}



   <ToggleSwitch
        label="Show Out of Stock Products"
        description="Display unavailable products in the store."
        checked={settings.showOutOfStock}
        onChange={() => toggle("showOutOfStock")}
      />
    

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

   
    </SettingsCard>
  );
}