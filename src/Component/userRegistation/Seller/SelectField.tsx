
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: string[];
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  required,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full h-10 rounded-lg border border-gray-300 px-4 appearance-none outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500"
        >
          <option>Select {label}</option>

          {options.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}