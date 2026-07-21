import { toast } from "sonner";
import ProfileInformation from "../Edit/Profilenformation";
import StoreInformation from "../Edit/StoreInformation";
import StorePreferences from "../Edit/StorePreferences";
import { useParams, useNavigate ,useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateAdminMutation,
} from "../../../../api/adminAuthApi";

import type { Payload } from "./Payload";




export default function EditSeller() {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(id);
    const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from || "/dashboard/Role-And-Permission";

  const [updateAdmin] = useUpdateAdminMutation();
  const [formData, setFormData] = useState<Payload>({
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
    // password: "",
    status:"Pending",
    role: "Admin",
    rejectionReason: "",
    KYCVerified: false,
    accountMode: false,
    vacationMode:false,
    createdAt: "",
    updatedAt: ""

  });


  useEffect(() => {
    if (data?.data) {
      setFormData({
        fullName: data.data.fullName ?? "",
        email: data.data.email ?? "",
        phone: data.data.phone ?? "",
        businessType: data.data.businessType ?? "",
        businessName: data.data.businessName ?? "",
        businessAddress: data.data.businessAddress ?? "",
        city: data.data.city ?? "",
        state: data.data.state ?? "",
        pincode: data.data.pincode ?? "",
        accountHolderName: data.data.accountHolderName ?? "",
        bankName: data.data.bankName ?? "",
        accountNumber: data.data.accountNumber ?? "",
        ifscCode: data.data.ifscCode ?? "",
        gstNumber: data.data.gstNumber ?? "",
        panNumber: data.data.panNumber ?? "",
        // password: data.data.password ?? "",
        status: data.data.status ?? "",
        role:(data.data.role as "Admin" | "SuperAdmin") ?? "Admin",
        rejectionReason: data.data.rejectionReason ?? "",
        KYCVerified: data.data.KYCVerified ??  false,
        accountMode: data.data.accountMode ??  false,
        vacationMode: data.data.vacationMode ?? false,
        createdAt: data.data.createdAt ?? "",
        updatedAt: data.data.updatedAt ?? "",
      });
    }
  }, [data]);



  const handleUpdate = async () => {
  console.log("Sending Data:", formData);

    if (!id) return;
    try {
      await updateAdmin({
        id,
        body: formData,
      }).unwrap();
      toast.success("Updated successfully.");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1200)

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  return (

    <div className="space-y-6">
      <ProfileInformation
        formData={formData}
        handleChange={handleChange}
      />

      <StoreInformation
        formData={formData}
        handleChange={handleChange}
      />

      <StorePreferences
        formData={formData}
        setFormData={setFormData}
      />

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}