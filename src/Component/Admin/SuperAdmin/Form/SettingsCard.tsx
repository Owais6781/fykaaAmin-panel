import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: ReactNode;
};

export default function SettingsCard({
  title,
  description,
  leftIcon,
  rightIcon,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
      <div className="flex items-center justify-between p-4">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            {rightIcon}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{title}</h2>

            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>

        {/* Right Icon */}
        <div >
          {leftIcon}
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 p-6">
        {children}
      </div>
    </div>
  );
}