import { FileText, Hash, AlertCircle, ChevronRight } from "lucide-react";
import InputField from "../InputField";
import type { RegisterPayload } from "../../../../api/adminAuthApi";

interface TaxInfoProps {
  formData: RegisterPayload;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function TaxInfo({
  formData,
  handleChange,
  onBack,
  onNext,
}: TaxInfoProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Tax Information
        </h2>

        <p className="text-slate-600 text-sm">
          GST and PAN details help us process your payments correctly and comply
          with regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="GST Number (Optional)"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          placeholder="15-digit GST number"
          icon={<FileText size={18} />}
        />

        <InputField
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="10-digit PAN number"
          icon={<Hash size={18} />}
          required
        />
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle
            size={20}
            className="text-blue-600 flex-shrink-0 mt-0.5"
          />

          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              GST is optional but recommended
            </p>

            <p className="text-xs text-blue-800">
              If your business structure requires GST registration, provide it
              for better compliance and payment processing.
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