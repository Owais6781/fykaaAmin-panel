

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: React.ReactNode;
  type?: string;
  required?: boolean;
}
export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  required = false,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-10 rounded-lg border border-gray-300
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          outline-none transition
          ${icon ? "pl-11" : "px-4"} pr-4`}
          
        />
      </div>
    </div>
  );
}



// interface InputFieldProps {
//   label:string;
//   name: string;
//   value: string;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
//   placeholder?: string;
//   type?: string;
// }

// export default function InputField({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }: InputFieldProps) {
//   return (
//     <input
//       type={type}
//       name={name}          // ✅ Important
//       value={value}        // ✅ Important
//       onChange={onChange}  // ✅ Important
//       placeholder={placeholder}
//     />
//   );
// }