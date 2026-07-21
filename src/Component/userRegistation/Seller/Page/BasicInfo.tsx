import { User, Mail, Phone, Lock, ChevronRight } from "lucide-react";
import InputField from "../InputField";
import type { RegisterPayload } from "../../../../api/adminAuthApi";

interface BasicInfoProps {
  formData: RegisterPayload;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
}

export default function BasicInfo({
  formData,
  handleChange,
  onNext,
}: BasicInfoProps) {
  return (
    <div className="bg-white px-8 py-8">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-2 text-[15px] text-slate-500">
          Start with your personal details. These help us verify your account
          and communicate with you.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          icon={<User size={18} />}
          required
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          icon={<Mail size={18} />}
          required
        />

        <InputField
          label="Mobile Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          icon={<Phone size={18} />}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a strong password"
          icon={<Lock size={18} />}
          required
        />
      </div>

      {/* Button */}
      <div className="mt-10">
        <button
          type="button"
          onClick={onNext}
          className="w-full h-12 rounded-lg bg-teal-600 hover:bg-teal-700 transition-all duration-200 text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}