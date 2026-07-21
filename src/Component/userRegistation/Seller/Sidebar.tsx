
import StepItem from "./StepItem";
import { Headphones } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl border  border-gray-300 shadow-sm p-6">

        <div className="space-y-7">

          <StepItem
            number={1}
            active
            title="Basic Information"
            subtitle="Enter basic details"
          />

          <StepItem
            number={2}
            title="Business Information"
            subtitle="Business details"
          />

          <StepItem
            number={3}
            title="Tax Information"
            subtitle="GST & PAN"
          />

          <StepItem
            number={4}
            title="Bank Details"
            subtitle="Bank account"
          />

          <StepItem
            number={5}
            title="Document Upload"
            subtitle="Upload documents"
          />

          <StepItem
            number={6}
            title="Store Information"
            subtitle="Store details"
          />

          <StepItem
            number={7}
            title="Shipping Details"
            subtitle="Pickup address"
          />

          <StepItem
            number={8}
            title="Product Categories"
            subtitle="Categories"
          />

          <StepItem
            number={9}
            title="Terms & Conditions"
            subtitle="Accept policies"
          />

          <StepItem
            number={10}
            title="Review & Submit"
            subtitle="Final step"
          />

        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6 text-center">

        <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Headphones
            className="text-blue-600"
            size={30}
          />
        </div>

        <h3 className="font-bold mt-5">
          Need Help?
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Our support team is here to help you anytime.
        </p>

        <button className="mt-5 w-full rounded-lg border border-blue-600 py-3 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}