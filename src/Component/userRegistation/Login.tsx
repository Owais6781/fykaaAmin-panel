


import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAdminLoginMutation } from "../../api/adminAuthApi";
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

      if (res.user) {
        localStorage.setItem("admin", JSON.stringify(res.user));
      }
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to Faykaa!",
        confirmButtonText: "Continue",
      });



      navigate("/dashboard", { replace: true });

    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
      const message = error?.data?.message || "Something went wrong";
      Swal.fire({
        icon: "warning",
        title: message.includes("rejected")
          ? "Account Rejected"
          : message.includes("pending")
            ? "Account Pending"
            : "Login Failed",
        text: message,
      });

    }
  };

 

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
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/SellerRegister" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

