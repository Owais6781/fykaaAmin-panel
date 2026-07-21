import { FileText } from "lucide-react";

interface DocumentsInfoProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function DocumentsInfo({
  onBack,
  onComplete,
}: DocumentsInfoProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Documents
        </h2>

        <p className="text-slate-600 text-sm">
          Upload documents to verify your identity and bank details.
          (This section is currently disabled.)
        </p>
      </div>

      {/* Upload Placeholder */}
      <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 text-center">
        <FileText
          size={32}
          className="mx-auto text-slate-400 mb-3"
        />

        <p className="text-slate-600 font-medium">
          Document upload coming soon
        </p>

        <p className="text-slate-500 text-sm mt-1">
          You'll be able to upload PAN, Aadhaar, GST,
          and cancelled cheque documents here.
        </p>
      </div>

      {/* Buttons */}
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
          onClick={onComplete}
          className="flex-1 py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}