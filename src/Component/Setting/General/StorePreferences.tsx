import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import ToggleSwitch from "./FormFild/ToggleSwitch";
import SettingsCard from "./FormFild/SettingsCard";
import { useUpdateAdminMutation } from "../../../api/adminAuthApi";


type Props = {
  user: any;
};
export default function StorePreferences({ user }: Props) {

  const [updateAdmin] = useUpdateAdminMutation();

 

  const [settings, setSettings] = useState({
    vacationMode: false,
    hideOutOfStock: false,
  });


  useEffect(() => {
    if (user) {
      setSettings({
        vacationMode: user.vacationMode,
        hideOutOfStock: user.hideOutOfStock,
      });
    }
  }, [user]);









  const toggle = async (key: keyof typeof settings) => {
    const value = !settings[key];

    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    try {
      await updateAdmin({
        id: user._id,
        body: {
              [key]: value,
        },
      }).unwrap();
    } catch (err) {
      console.error(err);

      // API fail ho to UI rollback
      setSettings((prev) => ({
        ...prev,
        [key]: !value,
      }));
    }
  };





  return (
    <SettingsCard
      title="Store Preferences"
      description="Configure general preferences for your store."
      rightIcon={<Settings className="text-indigo-600" size={22} />}
      leftIcon={""}
    >

      <ToggleSwitch
        label="Vacation Mode"
        description="Hide your products from customers until you turn off Vacation Mode."
        checked={settings.vacationMode}
        onChange={() => toggle("vacationMode")}
      />

      <ToggleSwitch
        label="Hide Out of Stock Products"
        description="Hide out-of-stock products from customers on the website."
        checked={settings.hideOutOfStock}
        onChange={() => toggle("hideOutOfStock")}
      />

    </SettingsCard>
  );
}