

interface Props {
  number: number;
  title: string;
  subtitle: string;
  active?: boolean;
}

export default function StepItem({
  number,
  title,
  subtitle,
  active,
}: Props) {
  return (
    <div className="flex gap-4">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
        ${
          active
            ? "bg-blue-600 text-white"
            : "border border-gray-300 text-gray-600"
        }`}
      >
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}