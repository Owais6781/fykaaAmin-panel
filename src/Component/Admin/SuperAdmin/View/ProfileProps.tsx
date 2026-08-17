export interface User {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    city: string;
    state: string;
    pincode: string;
    businessName: string;
    businessType: string;
    businessAddress: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    gstNumber: string;
    panNumber: string;
    KYCVerified: boolean
    accountMode: boolean
    vacationMode: boolean;
    createdAt: string;
}
export interface SellerFormData {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessName: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  gstNumber: string;
  panNumber: string;
  status: string;
  KYCVerified: boolean;
  accountMode: boolean;
  vacationMode: boolean;
}


export interface ProfileProps {
    user: User;
};

export interface FormData {
  vacationMode: boolean;
}

export interface StorePreferencesProps {
  formData: SellerFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellerFormData>>;
  handleToggleSwitch: () => void;
}
