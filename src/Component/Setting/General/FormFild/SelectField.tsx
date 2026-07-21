type SelectFieldProps = {
  label: string;
  options: string[];
};

export default function SelectField({
  label,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <select  className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          py-2.5
          text-sm
          text-gray-700
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
         hover:border-indigo-300 
        ">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}