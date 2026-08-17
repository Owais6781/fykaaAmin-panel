import { Trash2, Loader2 } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  title?: string;
  message: string;
  itemName?: string;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({
  open,
  title = "Delete Item?",
  message,
  itemName,
  isDeleting = false,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl">

        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <Trash2 size={24} />
        </div>

        <h3 className="text-lg font-bold text-center text-slate-900 mb-1">
          {title}
        </h3>

        <p className="text-sm text-center text-slate-500 mb-6">
          {message}{" "}
          {itemName && (
            <span className="font-semibold text-slate-700">
              "{itemName}"
            </span>
          )}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}

            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;