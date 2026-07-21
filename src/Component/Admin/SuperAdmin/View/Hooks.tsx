import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery,useUpdateAdminMutation } from "../../../../api/adminAuthApi";

export function Hooks() {
    const { id } = useParams();

    const { data, isLoading, error, refetch } = useGetUserByIdQuery(id);
    const [updateAdmin,] = useUpdateAdminMutation();

    const [formData, setFormData] = useState({
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
        KYCVerified: "",
        accountMode: "",
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
                KYCVerified: data.data.KYCVerified || "",
                accountMode: data.data.accountMode || "",
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
    vacationMode:formData.vacationMode,
  },
   
    }).unwrap();

    refetch(); // optional
  } catch (err) {
    console.error(err);
  }
};





    return {
        id,
        user: data?.data,
        formData,
        setFormData,
        handleToggleSwitch,
        isLoading,
        error,
        refetch,
    };
}