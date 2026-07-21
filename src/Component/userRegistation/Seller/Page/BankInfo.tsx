import {
  User,
  Landmark,
  CreditCard,
  Hash,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import InputField from "../InputField";
import type { RegisterPayload } from "../../../../api/adminAuthApi";

interface BankInfoProps {
  formData: RegisterPayload;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function BankInfo({
  formData,
  handleChange,
  onBack,
  onNext,
}: BankInfoProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Bank Details
        </h2>

        <p className="text-slate-600 text-sm">
          Your earnings will be transferred directly to this account.
          Please ensure all details are correct.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Account Holder Name"
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleChange}
          placeholder="Name as per bank account"
          icon={<User size={18} />}
          required
        />

        <InputField
          label="Bank Name"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="e.g. HDFC Bank, ICICI Bank"
          icon={<Landmark size={18} />}
          required
        />

        <InputField
          label="Account Number"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          placeholder="Your account number"
          icon={<CreditCard size={18} />}
          required
        />

        <InputField
          label="IFSC Code"
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleChange}
          placeholder="e.g. HDFC0001234"
          icon={<Hash size={18} />}
          required
        />
      </div>

      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle
            size={20}
            className="text-amber-600 flex-shrink-0 mt-0.5"
          />

          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">
              Verify your bank details
            </p>

            <p className="text-xs text-amber-800">
              Double-check all information. Errors may delay payment
              processing. You can verify your IFSC code on your bank's
              website.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}