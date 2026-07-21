type ToggleSwitchProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

export default function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border  border-gray-300 p-4 hover:border-indigo-300 transition">

      <div>
        <h3 className="font-semibold text-gray-800">
          {label}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition-all ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            checked ? "right-1" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}