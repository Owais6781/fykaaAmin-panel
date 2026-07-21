import ProfileInformation from "../View/Profilenformation";
import StoreInformation from "../View/StoreInformation";
import StorePreferences from "../View/StorePreferences";


export default function ViewSellerInfo() {
  return (
    <div className="space-y-6">
      <ProfileInformation />
      <StoreInformation />
      <StorePreferences />
    </div>
  );
}