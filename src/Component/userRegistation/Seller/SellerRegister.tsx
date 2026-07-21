


import {
    User,
    Mail,
    Phone,
    Lock,
    Store,
    MapPin,
    Building2,
    CreditCard,
    Landmark,
    FileText,
    Hash,
    CheckCircle2,
    ChevronRight,
    Package,
} from "lucide-react";
import { useState } from "react";
// import UploadBox from "../Seller/UploadBox";
import TermsSection from "../Seller/TermsSection";
import Header from "../Seller/Header";
import Sidebar from "../Seller/Sidebar";
import SelectField from "../Seller/SelectField";
import InputField from "../Seller/InputField";
import SectionTitle from "../Seller/SectionTitle";
import { useAdminRegisterMutation } from "../../../api/adminAuthApi";
import { useNavigate } from "react-router-dom";

type SectionId =
    | "basic"
    | "business"
    | "tax"
    | "bank"
    | "documents";

interface Section {
    id: SectionId;
    title: string;
}


// interface Documents {
//   panCard: File | null;
//   aadhaarCard: File | null;
//   gstCertificate: File | null;
//   cancelledCheque: File | null;
// }

import type {RegisterPayload} from "../../../api/adminAuthApi"

// interface RegisterPayload {
//     fullName: string;
//     email: string;
//     phone: string;
//     password: string;
//     role:  "admin" | "SuperAdmin";
//     businessType: string;
//     businessName: string;
//     businessAddress: string;
//     city: string;
//     state: string;
//     pincode: string;
//     gstNumber: string;
//     panNumber: string;
//     accountHolderName: string;
//     bankName: string;
//     accountNumber: string;
//     ifscCode: string;

//     status: "Pending" | "Approved" | "Rejected";
//     isVerified: boolean;
//     isActive: boolean;
//     rejectionReason: string;
//     //   documents: Documents;
// }




export default function SellerRegisterImproved() {
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [completedSections, setCompletedSections]
        = useState<Record<SectionId, boolean>>({ basic: true, business: false, tax: false, bank: false, documents: false, });




    const navigate = useNavigate();
    const [adminRegister, { isLoading }] = useAdminRegisterMutation();

    const [formData, setFormData] = useState<RegisterPayload>({
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
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        status: "Pending",
        KYCVerified: false,
        accountMode: false,
        vacationMode: false,
        rejectionReason: "",
        //  documents: {
        //   panCard: null,
        //   aadhaarCard: null,
        //   gstCertificate: null,
        //   cancelledCheque: null,
        // },
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleDocumentChange = (
    //     field: "panCard" | "aadhaarCard" | "gstCertificate" | "cancelledCheque",
    //     file: File
    // ) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         documents: {
    //             ...prev.documents,
    //             [field]: file,
    //         },
    //     }));
    // };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {


            const res = await adminRegister(formData).unwrap();

            alert(res.message || "Registration Successful");
            console.log(res);

            setFormData({
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
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                status: "Pending",
                KYCVerified: false,
                accountMode: true,
                vacationMode: false,
                rejectionReason: "",
                // documents: {
                //     panCard: null,
                //     aadhaarCard: null,
                //     gstCertificate: null,
                //     cancelledCheque: null,
                // },

            });
            navigate("/login")
        } catch (error: any) {
            console.log(error);
            alert(error?.data?.message || "Error occurred");
        }
    };









    const sections: Section[] = [
        { id: "basic", title: "Basic Info", },
        { id: "business", title: "Business", },
        { id: "tax", title: "Tax Details", },
        { id: "bank", title: "Bank Info", },
        { id: "documents", title: "Documents", },
    ];

    const toggleSection = (sectionId: SectionId) => {
        setCompletedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const completedCount = Object.values(completedSections).filter(Boolean).length;
    const progressPercentage = (completedCount / sections.length) * 100;



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
          <p className="mt-6 text-gray-600 font-medium">Loading Dashboard...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }


    return (
        <form
            onSubmit={handleSubmit}>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <Header />

                <div className="max-w-[1600px] mx-auto p-8">
                    {/* Progress Header */}
                    <div className="mb-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Your Registration Progress
                                </h2>
                                <p className="text-sm text-slate-600 mt-1">
                                    {completedCount} of {sections.length} sections completed
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-teal-600">
                                    {Math.round(progressPercentage)}%
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>

                        {/* Section Pills */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => toggleSection(section.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm cursor-pointer ${completedSections[section.id]
                                        ? "bg-teal-100 text-teal-700 border border-teal-300"
                                        : "bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200"
                                        }`}
                                >
                                    {/* <span>{section.icon}</span> */}
                                    <span>{section.title}</span>
                                    {completedSections[section.id] && (
                                        <CheckCircle2 size={16} className="ml-1" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        {/* Sidebar */}
                        <div className="col-span-3">
                            <Sidebar />
                        </div>

                        {/* Main Form */}
                        <div className="col-span-7">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 min-h-[900px]">
                                <div className="mb-2">
                                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                                        Seller Onboarding
                                    </span>
                                </div>

                                <h1 className="text-4xl font-bold text-slate-900 mt-4">
                                    Welcome to Faykaa
                                </h1>

                                <p className="text-slate-600 mt-3 text-lg leading-relaxed">
                                    Let's set up your seller account. We'll guide you through each step to get your business online.
                                </p>

                                <div className="border-b border-slate-200 mt-4 mb-4"></div>

                                {/* Basic Information Section */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-3 ">
                                        <div className="w-10 h-10 rounded-full mb-8 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold">
                                            1
                                        </div>
                                        <SectionTitle title="Basic Information" />
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4">
                                        Start with your personal details. These help us verify your account.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="Full Name *"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            icon={<User size={18} />}

                                        />

                                        <InputField
                                            label="Email Address *"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Enter email"
                                            icon={<Mail size={18} />}

                                        />

                                        <InputField
                                            label="Mobile Number *"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}

                                            placeholder="Enter mobile number"
                                            icon={<Phone size={18} />}

                                        />

                                        <InputField
                                            label="Password *"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type="password"
                                            placeholder="Enter password"
                                            icon={<Lock size={18} />}

                                        />
                                    </div>
                                </div>

                                <div className="border-b border-slate-200 mb-6"></div>

                                {/* Business Information Section */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-3 ">
                                        <div className="w-10 h-10 rounded-full mb-8 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                        <SectionTitle title="Business Information" />
                                    </div>

                                    <p className="text-slate-600 text-sm  mb-4 ">
                                        Tell us about your business and where you operate.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <SelectField
                                            label="Business Type "
                                            name="businessType"
                                            value={formData.businessType}
                                            onChange={handleChange}

                                            options={[
                                                "Individual",
                                                "Proprietorship",
                                                "Partnership",
                                                "LLP",
                                                "Private Limited",
                                                "Public Limited",
                                            ]}
                                        />

                                        <InputField
                                            label="Business Name / Store Name *"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="Enter business or store name"
                                            icon={<Store size={18} />}

                                        />

                                    </div>

                                    <div className="mt-6">
                                        <InputField
                                            label="Business Address *"
                                            name="businessAddress"
                                            value={formData.businessAddress}
                                            onChange={handleChange}
                                            placeholder="Enter complete business address"
                                            icon={<MapPin size={18} />}

                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 mt-6">
                                        <InputField
                                            label="City *"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter city"
                                            icon={<Building2 size={18} />}

                                        />

                                        <SelectField
                                            label="State *"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}

                                            options={[
                                                "Andhra Pradesh",
                                                "Arunachal Pradesh",
                                                "Assam",
                                                "Bihar",
                                                "Chhattisgarh",
                                                "Delhi",
                                                "Goa",
                                                "Gujarat",
                                                "Haryana",
                                                "Himachal Pradesh",
                                                "Jharkhand",
                                                "Karnataka",
                                                "Kerala",
                                                "Madhya Pradesh",
                                                "Maharashtra",
                                                "Odisha",
                                                "Punjab",
                                                "Rajasthan",
                                                "Tamil Nadu",
                                                "Telangana",
                                                "Uttar Pradesh",
                                                "Uttarakhand",
                                                "West Bengal",
                                            ]}
                                        />

                                        <InputField
                                            label="PIN Code *"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Enter PIN Code"

                                        />
                                    </div>
                                </div>

                                <div className="border-b border-slate-200 mb-6"></div>

                                {/* Tax Information Section */}
                                <div className=" mb-4">
                                    <div className="flex items-center gap-3 ">
                                        <div className="w-10 h-10 rounded-full mb-8 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                        <SectionTitle title="Tax Information" />
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4">
                                        GST details help us process your payments correctly.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="GST Number"
                                            name="gstNumber"
                                            value={formData.gstNumber}
                                            onChange={handleChange}
                                            placeholder="Enter GST Number"
                                            icon={<FileText size={18} />}
                                        />

                                        <InputField
                                            label="PAN Number *"
                                            name="panNumber"
                                            value={formData.panNumber}
                                            onChange={handleChange}
                                            placeholder="Enter PAN Number"
                                            icon={<Hash size={18} />}

                                        />
                                    </div>

                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-700">
                                            <strong>Note:</strong> GST is mandatory for most businesses. If your category doesn't
                                            require GST, you can leave this field empty.
                                        </p>
                                    </div>
                                </div>

                                <div className="border-b border-slate-200 mb-6"></div>

                                {/* Bank Details Section */}
                                <div className=" mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full mb-8 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                            4
                                        </div>
                                        <SectionTitle title="Bank Details" />
                                    </div>

                                    <p className="text-slate-600 text-sm  mb-4">
                                        Your earnings will be transferred to this account.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <InputField
                                            label="Account Holder Name *"
                                            name="accountHolderName"
                                            value={formData.accountHolderName}
                                            onChange={handleChange}
                                            placeholder="Enter account holder name"
                                            icon={<User size={18} />}

                                        />

                                        <InputField
                                            label="Bank Name *"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            placeholder="Enter bank name"
                                            icon={<Landmark size={18} />}

                                        />

                                        <InputField
                                            label="Account Number *"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleChange}
                                            placeholder="Enter account number"
                                            icon={<CreditCard size={18} />}

                                        />

                                        <InputField
                                            label="IFSC Code *"
                                            name="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                            placeholder="Enter IFSC code"
                                            icon={<Hash size={18} />}

                                        />
                                    </div>
                                </div>

                                <div className="border-b border-slate-200 mb-6"></div>

                                {/* Document Upload Section */}
                                <div className=" mb-4">
                                    <div className="flex items-center gap-3 ">
                                        <div className="w-10 h-10 rounded-full mb-8 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                                            5
                                        </div>
                                        <SectionTitle title="Document Upload" />
                                    </div>

                                    <p className="text-slate-600 text-sm mb-4">
                                        Upload documents to verify your identity and bank details.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* <UploadBox
                                            title="PAN Card"
                                            field="panCard"
                                            fileName={formData.documents.panCard?.name}
                                            onFileChange={handleDocumentChange}


                                        /> */}
                                        {/* <UploadBox title="Aadhaar Card"
                                            field="aadhaarCard"
                                            fileName={formData.documents.aadhaarCard?.name}
                                            onFileChange={handleDocumentChange}

                                        /> */}
                                        {/* <UploadBox
                                            title="GST Certificate"
                                            field="gstCertificate"
                                            fileName={formData.documents.gstCertificate?.name}
                                            onFileChange={handleDocumentChange}
                                        /> */}
                                        {/* <UploadBox
                                            title="Cancelled Cheque"
                                            field="cancelledCheque"
                                            fileName={formData.documents.cancelledCheque?.name}
                                            onFileChange={handleDocumentChange} 
                                            /> */}
                                    </div>
                                </div>

                                {/* Terms Section */}
                                <div className="border-t border-slate-200 pt-8 mt-12">
                                    <TermsSection checked={acceptTerms} onChange={setAcceptTerms} />

                                    <button
                                        type="submit"
                                        disabled={!acceptTerms}
                                        className={`mt-8 w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${acceptTerms
                                            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl"
                                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Create Your Account
                                        <ChevronRight size={20} />
                                    </button>

                                    <p className="text-center text-slate-600 text-sm mt-4">
                                        Already have an account?{" "}
                                        <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">
                                            Sign in instead
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Benefits */}
                        <div className="col-span-2">
                            <div className="sticky top-8 space-y-6">
                                {/* Main Benefits Card */}
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                    <h2 className="font-bold text-lg text-slate-900 mb-6">
                                        Why Sell on Faykaa?
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                                <span className="text-lg">📈</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                                                    Grow Your Business
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Reach thousands of customers across India.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-lg">🔒</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                                                    Secure Platform
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Fast and secure payments with trusted support.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                                <span className="text-lg">💰</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                                                    Increase Sales
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Powerful tools to boost your business.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                <span className="text-lg">👥</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                                                    24/7 Support
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Dedicated support whenever you need help.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                                    <p className="text-sm font-semibold opacity-90 mb-2">
                                        Join thousands of sellers
                                    </p>
                                    <div className="flex gap-6">
                                        <div>
                                            <p className="text-2xl font-bold">50K+</p>
                                            <p className="text-xs opacity-80">Active Sellers</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">10M+</p>
                                            <p className="text-xs opacity-80">Monthly Orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}