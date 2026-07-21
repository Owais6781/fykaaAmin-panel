

import type { RegisterPayload } from "../../../../api/adminAuthApi";
import BasicInfo from "./BasicInfo";
// import BusinessInfo from "./Page/BusinessInfo";
import TaxInfo from "./TaxInfo";
import BankInfo from "./BankInfo";
// import DocumentInfo from "./Page/DocumentInfo";
import { useState } from "react";

interface SellerFormProps {
  initialValues: RegisterPayload;
  onSubmit: (data: RegisterPayload) => void;
  isLoading?: boolean;
  submitText?: string;
}

export default function SellerForm({
  initialValues,
  onSubmit,
  // isLoading,
  // submitText = "Save",
}: SellerFormProps) {


  const [formData, setFormData] = useState<RegisterPayload>(initialValues);

 const [activeSection, setActiveSection] = useState<
  "basic" | "business" | "tax" | "bank" | "document"
>("basic");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };






return (
 <form onSubmit={handleFormSubmit}>


  {activeSection === "basic" && (
  <BasicInfo
    formData={formData}
    handleChange={handleChange}
    onNext={() => setActiveSection("business")}
  />
)}
 {/* {activeSection === "business" && (
      <BusinessInfo
        formData={formData}
        handleChange={handleChange}
        onBack={() => setActiveSection("basic")}
        onNext={() => setActiveSection("tax")}
      />
    )} */}

 {activeSection === "tax" && (
   <TaxInfo
     formData={formData}
     handleChange={handleChange}
     onBack={() => setActiveSection("business")}
     onNext={() => setActiveSection("bank")}
   />
 )}

{activeSection === "bank" && (
  <BankInfo
    formData={formData}
    handleChange={handleChange}
    onBack={() => setActiveSection("tax")}
    onNext={() => setActiveSection("document")}
  />
)}

{/* {activeSection === "document" && (
  <DocumentInfo
    formData={formData}
    handleChange={handleChange}
    onBack={() => setActiveSection("bank")}
    onSubmit={handleFormSubmit}
    isLoading={isLoading}
    submitText={submitText}
  />
)} */}


</form>
  )
}