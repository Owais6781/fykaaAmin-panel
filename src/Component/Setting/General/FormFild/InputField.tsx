// type InputFieldProps = {
//   label: string;
//   type?: string;
//   placeholder?: string;
//   value?: string;
// };

// export default function InputField({
//   label,
//   type = "text",
//   placeholder,
//   value,
// }: InputFieldProps) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-2">
//         {label}
//       </label>

//       <input
//         type={type}
//         defaultValue={value}
//         placeholder={placeholder}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </div>
//   );
// }







type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  readOnly?:boolean;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  className,
  readOnly,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
     className={className}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}