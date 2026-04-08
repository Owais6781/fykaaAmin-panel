// import { useState } from "react";
// import axios from "axios";

// export default function SellerRegister() {
//     const [formData, setFormData] = useState({
//         fullName: "",
//         mobile: "",
//         email: "",
//         password: "",
//         // panNumber: "",
//         // gstNumber: "",
//         // accountHolderName: "",
//         // accountNumber: "",
//         // ifscCode: "",
//         // bankName: "",
//         // addressLine1: "",
//         // city: "",
//         // state: "",
//         // pincode: "",
//     });

//     const handleChange = (e: any) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };


//     const Api = import.meta.env.VITE_API_URL


//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post(
//                 `${Api}/sell`,
//                 formData
//             );
//             alert("Registration Successful");
//             console.log(res.data);
//         } catch (error) {
//             alert("Error occurred");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-center">
//                     Seller Registration
//                 </h2>

//                 <div className="grid grid-cols-2 gap-4">

//                     <input name="fullName" placeholder="Full Name"
//                         onChange={handleChange} className="input" required />

//                     <input name="mobile" placeholder="Mobile Number"
//                         onChange={handleChange} className="input" required />

//                     <input name="email" type="email" placeholder="Email"
//                         onChange={handleChange} className="input" required />

//                     <input name="password" type="password" placeholder="Password"
//                         onChange={handleChange} className="input" required />

//                     {/* <input name="panNumber" placeholder="PAN Number"
//             onChange={handleChange} className="input" required />

//           <input name="gstNumber" placeholder="GST Number"
//             onChange={handleChange} className="input" required />

//           <input name="accountHolderName" placeholder="Account Holder Name"
//             onChange={handleChange} className="input" required />

//           <input name="accountNumber" placeholder="Account Number"
//             onChange={handleChange} className="input" required />

//           <input name="ifscCode" placeholder="IFSC Code"
//             onChange={handleChange} className="input" required />

//           <input name="bankName" placeholder="Bank Name"
//             onChange={handleChange} className="input" required />

//           <input name="addressLine1" placeholder="Address"
//             onChange={handleChange} className="input col-span-2" required />

//           <input name="city" placeholder="City"
//             onChange={handleChange} className="input" required />

//           <input name="state" placeholder="State"
//             onChange={handleChange} className="input" required />

//           <input name="pincode" placeholder="Pincode"
//             onChange={handleChange} className="input" required />
//         </div> */}

//                     <button
//                         type="submit"
//                         className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
//                     >
//                         Register
//                     </button>
//                       </div>
//             </form>


//         </div>

//     )
// }


import { useState } from "react";
import { useRegisterMutation } from "../../api/userapi";

export default function SellerRegister() {
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
     mobile:"",
    password: "",
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();
      alert("Registered Successfully");
      console.log(res);
    } catch (error) {
      alert("error.data.message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" bg-gray-200  ml-67">
      <input
        placeholder="fullName"
        onChange={(e) =>
          setFormData({ ...formData, fullName: e.target.value })
        }
      />
      <input
        placeholder="Email"
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
        <input
        type="mobile"
        placeholder="mobile"
        onChange={(e) =>
          setFormData({ ...formData, mobile: e.target.value })
        }
      />
      <input
        type="password"
        
        placeholder="Password"
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      <button type="submit">Register</button>
    </form>
  );
}