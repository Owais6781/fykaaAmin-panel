
import { useNavigate, useParams } from "react-router-dom";
import SellerForm from "./SellerForm";
import type { RegisterPayload } from "../../../../api/adminAuthApi";

export default function EditSeller() {
    const { id } = useParams();
    const navigate = useNavigate();


    // Replace this with API data
    const sellerData: RegisterPayload = {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "Admin",

        businessType: "",
        businessName: "",
        businessAddress: "",
        city: "",
        state: "",
        pincode: "",
        gstNumber: "",
        panNumber: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        status: "Pending",
          KYCVerified:false,
        vacationMode: false,
        accountMode: true,
        rejectionReason: "",

    };

    const updating = false;

    const handleUpdate = async (formData: RegisterPayload) => {
        console.log("Seller ID:", id);
        console.log("Updated Data:", formData);

        // await updateSeller({ id, ...formData }).unwrap();

        alert("Seller updated successfully");
        navigate("/admin/sellers");
    };

    return (
        <SellerForm
            initialValues={sellerData}
            submitText="Update Seller"
            isLoading={updating}
            onSubmit={handleUpdate}
        />




    );
}