
import { ImagePlus } from "lucide-react";

type UploadFieldProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File, preview: string) => void;
  accept?: string;
  className?: string;
  disabled?: boolean;
};

export default function UploadField({
  label = "Store Logo",
  value,
  onChange,
  accept = "image/*",
  className = "",
    disabled = false,
}: UploadFieldProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);
    onChange(file, preview);
  };

  return (
    <div className={className}>
      <label className="block cursor-pointer">
        <input
          hidden
          type="file"
          accept={accept}
          onChange={handleFile}
          disabled={disabled}
        />

        <div className="w-full max-w-xs h-58 mx-auto border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 flex flex-col items-center justify-center">
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-full object-contain rounded-xl p-4"
            />
          ) : (
            <>
              <span className="font-medium text-gray-700">{label}</span>

              <div className="w-16 h-16 mt-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <ImagePlus size={28} className="text-indigo-600" />
              </div>

              <h3 className="mt-6 text-gray-700 font-medium">
                Drag & drop your logo here
              </h3>

              <p className="text-sm text-gray-500">
                or click to browse
              </p>

              <p className="mt-5 text-xs text-gray-400">
                PNG, JPG or SVG (Max. 2MB)
              </p>
            </>
          )}
        </div>
      </label>
    </div>
  );
}