import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { RegisterPayload } from "../../../../api/adminAuthApi";
interface FormSectionProps {
   formData: RegisterPayload;
  title: string;
  description: string;
  children: ReactNode;
  showBack?: boolean;
  backLabel?: string;
  nextLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
}

export default function FormSection({
  // formData,
  title,
  description,
  children,
  showBack = true,
  backLabel = "Back",
  nextLabel = "Continue",
  onBack,
  onNext,
}: FormSectionProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {description}
        </p>
      </div>

      {/* Content */}
      <div>{children}</div>

      {/* Footer */}
      <div className="mt-8 flex gap-3">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
          >
            {backLabel}
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
        >
          {nextLabel}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}