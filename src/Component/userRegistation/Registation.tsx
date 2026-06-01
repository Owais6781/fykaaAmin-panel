


// import { useState,  } from "react";
// import type { ChangeEvent, FormEvent } from "react";
// import axios from "axios";

// export default function Register() {
//   const Api = import.meta.env.VITE_API_URL;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobile: "",
//     email: "",
//     password: "",
//     panNumber: "",
//     gstNumber: "",
//     accountHolderName: "",
//     accountNumber: "",
//     ifscCode: "",
//     bankName: "",
//     addressLine1: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const inputClass =
//     "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500";

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${Api}/api/sell`, formData);

//       alert("Registration Successful");
//       console.log(res.data);

//       setFormData({
//         fullName: "",
//         mobile: "",
//         email: "",
//         password: "",
//         panNumber: "",
//         gstNumber: "",
//         accountHolderName: "",
//         accountNumber: "",
//         ifscCode: "",
//         bankName: "",
//         addressLine1: "",
//         city: "",
//         state: "",
//         pincode: "",
//       });
//     } catch (error: any) {
//       console.log(error);
//       alert(error?.response?.data?.message || "Error occurred");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-3xl"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Seller Registration
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             name="fullName"
//             value={formData.fullName}
//             placeholder="Full Name"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="mobile"
//             value={formData.mobile}
//             placeholder="Mobile Number"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="email"
//             value={formData.email}
//             type="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="password"
//             value={formData.password}
//             type="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="panNumber"
//             value={formData.panNumber}
//             placeholder="PAN Number"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="gstNumber"
//             value={formData.gstNumber}
//             placeholder="GST Number"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="accountHolderName"
//             value={formData.accountHolderName}
//             placeholder="Account Holder Name"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="accountNumber"
//             value={formData.accountNumber}
//             placeholder="Account Number"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="ifscCode"
//             value={formData.ifscCode}
//             placeholder="IFSC Code"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="bankName"
//             value={formData.bankName}
//             placeholder="Bank Name"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="addressLine1"
//             value={formData.addressLine1}
//             placeholder="Address"
//             onChange={handleChange}
//             className={`${inputClass} sm:col-span-2`}
//             required
//           />

//           <input
//             name="city"
//             value={formData.city}
//             placeholder="City"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="state"
//             value={formData.state}
//             placeholder="State"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />

//           <input
//             name="pincode"
//             value={formData.pincode}
//             placeholder="Pincode"
//             onChange={handleChange}
//             className={inputClass}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }










import { useState } from "react";
import { useAdminRegisterMutation } from "../../api/adminAuthApi ";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [adminRegister, { isLoading }] = useAdminRegisterMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await adminRegister(formData).unwrap();

      alert(res.message || "Registration Successful");
      console.log(res);

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
     navigate("/login")
    } catch (error: any) {
      console.log(error);
      alert(error?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <div className="flex flex-col gap-4">
          <input
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}