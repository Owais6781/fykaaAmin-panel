



type InputFieldProps = {
  label: string;
   name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  readOnly?:boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
   name,
  type = "text",
  placeholder,
  value,
  readOnly,
  className,
   onChange,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
     className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
      />
    </div>
  );
}