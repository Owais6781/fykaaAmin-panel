// import { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);

//     // 👉 Yaha API call karega (Redux / Axios / RTK Query)
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Login to Your Account
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-4 mt-4">
//             <label className="block mb-1 text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label className="block mb-1 text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Extra Links */}
//         {/* <p className="text-sm text-center mt-4">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Register
//           </a>
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useRef } from 'react';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';

import { useState } from "react";
import { useAdminLoginMutation } from "../../api/adminAuthApi ";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();



  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await adminLogin(formData).unwrap();

      // ✅ token save
      if (res.token) {
        localStorage.setItem("token", res.token);

      }


      if (res.admin) {
        localStorage.setItem("admin", JSON.stringify(res.admin));
      }


      alert(res.message || "Login successful");
      navigate("/dashboard", { replace: true });

      // ✅ role based redirect
      // if (res.admin?.role === "admin") {
      //   navigate("/");
      // } else if (res.admin?.role === "admin") {
      //   navigate("/admin/dashboard");
      // } else {
      //   navigate("/seller/dashboard");
      // }

    } catch (error: any) {
      console.log(error);
      alert(error?.data?.message || "Login failed");
    }
  };
  // const toast = useRef<Toast>(null);

  // const showSuccess = () => {
  //   toast.current?.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Login successful",
  //     life: 3000,
  //   });
  // };

  // const showError = () => {
  //   toast.current?.show({
  //     severity: "error",
  //     summary: "Error",
  //     detail: "Login failed",
  //     life: 3000,
  //   });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4 mt-4">
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {/* <Toast ref={toast} position="top-center" />
          <Button label="Login" className="mr-2" onClick={showSuccess} /> */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

