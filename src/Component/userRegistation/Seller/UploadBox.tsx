// import { UploadCloud, FileText } from "lucide-react";

// interface UploadBoxProps {
//   title: string;
//   description?: string;
//   required?: boolean;
// }

// export default function UploadBox({
//   title,
//   description,
//   required = false,
// }: UploadBoxProps) {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-semibold text-gray-700">
//         {title}
//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <div
//         className="border-2 border-dashed border-gray-300 rounded-xl
//         hover:border-blue-500 transition cursor-pointer
//         p-6 bg-gray-50"
//       >
//         <div className="flex flex-col items-center justify-center text-center">

//           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
//             <UploadCloud className="text-blue-600" size={28} />
//           </div>

//           <h3 className="font-semibold mt-4">
//             Click to upload
//           </h3>

//           <p className="text-sm text-gray-500 mt-1">
//             or drag & drop
//           </p>

//           <p className="text-xs text-gray-400 mt-2">
//             PDF, JPG, JPEG, PNG (Max 5MB)
//           </p>

//           {description && (
//             <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
//               <FileText size={15} />
//               {description}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import { UploadCloud, FileText } from "lucide-react";
import { useRef } from "react";

interface UploadBoxProps {
  title: string;
  description?: string;
  required?: boolean;

  field: "panCard" | "aadhaarCard" | "gstCertificate" | "cancelledCheque";

  fileName?: string;

  onFileChange: (
    field: "panCard" | "aadhaarCard" | "gstCertificate" | "cancelledCheque",
    file: File
  ) => void;
}

export default function UploadBox({
  title,
  description,
  required = false,
  field,
  fileName,
  onFileChange,
}: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        {title}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileChange(field,file);
          }
        }}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl
        hover:border-blue-500 transition cursor-pointer
        p-6 bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UploadCloud className="text-blue-600" size={22} />
          </div>

          <h3 className="font-semibold mt-3">Click to upload</h3>

          <p className="text-sm text-gray-500">
            or drag & drop
          </p>

          <p className="text-xs text-gray-400 mt-2">
            PDF, JPG, JPEG, PNG (Max 5MB)
          </p>

          {fileName && (
            <p className="mt-3 text-sm font-medium text-green-600">
              {fileName}
            </p>
          )}

          {description && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <FileText size={15} />
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}