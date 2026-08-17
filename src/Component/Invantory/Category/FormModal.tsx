import  type{ ReactNode } from "react";
import { X } from "lucide-react";

interface FormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

const FormModal = ({
  open,
  title,
  onClose,
  children,
  maxWidth = "max-w-lg",
}: FormModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl p-6 w-full ${maxWidth} border border-slate-200 shadow-xl relative animate-in fade-in zoom-in duration-200`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default FormModal;