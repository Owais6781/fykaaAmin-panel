import { ShieldCheck } from "lucide-react";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function TermsSection({
  checked,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-blue-50 border-blue-200 p-6">

      <div className="flex gap-4">

        <ShieldCheck
          className="text-blue-600 mt-1"
          size={24}
        />

        <div className="flex-1">

          <h2 className="font-bold text-lg">
            Terms & Conditions
          </h2>

          <p className="text-sm text-gray-600 mt-2 leading-7">
            Please confirm that all the information provided is
            accurate. By registering as a seller on <b>Faykaa</b>,
            you agree to our Seller Agreement, Privacy Policy,
            Shipping Policy, Return Policy, and all marketplace rules.
          </p>

          <label className="flex items-start gap-3 mt-6 cursor-pointer">

            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="mt-1 h-5 w-5 accent-blue-600"
            />

            <span className="text-sm text-gray-700 leading-6">
              I have read and agree to the
              <span className="text-blue-600 font-medium cursor-pointer">
                {" "}Terms & Conditions
              </span>,
              <span className="text-blue-600 font-medium cursor-pointer">
                {" "}Privacy Policy
              </span>,
              and
              <span className="text-blue-600 font-medium cursor-pointer">
                {" "}Seller Agreement
              </span>.
            </span>

          </label>

        </div>

      </div>

    </div>
  );
}