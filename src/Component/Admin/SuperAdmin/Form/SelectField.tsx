interface SelectFieldProps {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  className
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <select
  
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}