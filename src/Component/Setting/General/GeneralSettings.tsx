import StoreInformation from "./StoreInformation";
import StorePreferences from "./StorePreferences";
import ProfileInformation from "./Profilenformation";
export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <ProfileInformation />
      <StoreInformation />
      <StorePreferences />
    </div>
  );
}