



export interface Payload {
  fullName: string;
  email: string;
  phone: string;
//   password: string;
 
  businessType: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  gstNumber: string;
  panNumber: string;
  rejectionReason: string;
  status:"Pending" | "Approved" | "Rejected";
  role:"Admin" | "SuperAdmin";
  KYCVerified: boolean ;
  accountMode: boolean;
  vacationMode: boolean;
  hideOutOfStock: boolean;
  createdAt: string;
  updatedAt: string;
}