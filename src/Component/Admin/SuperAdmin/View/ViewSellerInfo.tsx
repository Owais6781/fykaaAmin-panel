import { Package } from "lucide-react";
import ProfileInformation from "../View/Profilenformation";
import StoreInformation from "../View/StoreInformation";
import StorePreferences from "../View/StorePreferences";
 import type{ SellerFormData } from "./ProfileProps"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery,useUpdateAdminMutation } from "../../../../api/adminAuthApi";



export default function ViewSellerInfo() {



const { id } = useParams();
    const { data, isLoading, refetch } = useGetUserByIdQuery(id);
    const [updateAdmin,] = useUpdateAdminMutation();


 const [formData, setFormData] = useState<SellerFormData>({
        fullName: "",
        email: "",
        phone: "",
        businessType: "",
        businessAddress: "",
        city: "",
        state: "",
        pincode: "",
        businessName: "",
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        gstNumber: "",
        panNumber: "",
        status: "",
        KYCVerified: false,
        accountMode: false,
        vacationMode:false,
    });

    useEffect(() => {
        if (data?.data) {
            setFormData({
                fullName: data.data.fullName || "",
                email: data.data.email || "",
                phone: data.data.phone || "",
                businessType: data.data.businessType || "",
                businessAddress: data.data.businessAddress || "",
                city: data.data.city || "",
                state: data.data.state || "",
                pincode: data.data.pincode || "",
                businessName: data.data.businessName || "",
                accountHolderName: data.data.accountHolderName || "",
                bankName: data.data.bankName || "",
                accountNumber: data.data.accountNumber || "",
                ifscCode: data.data.ifscCode || "",
                gstNumber: data.data.gstNumber || "",
                panNumber: data.data.panNumber || "",
                status: data.data.status || "",
                KYCVerified: data.data.KYCVerified || false,
                accountMode: data.data.accountMode || false,
                vacationMode: data.data.vacationMode || false,
            });
        }
    }, [data]);

const handleToggleSwitch = async () => {

    
  try {

    if (!id) return;
    await updateAdmin({
      id,
        body: {
    accountMode:formData.accountMode,
    vacationMode:formData.vacationMode,
  },
   
    }).unwrap();

    refetch(); // optional
  } catch (err) {
    console.error(err);
  }
};


  const user = data?.data;


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={28} className="text-purple-600" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading ...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <ProfileInformation user={user} />
      <StoreInformation user={user} />
      <StorePreferences
        formData={formData}
        setFormData={setFormData}
        handleToggleSwitch={handleToggleSwitch}
      />
    </div>
  );
}