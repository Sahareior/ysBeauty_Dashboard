import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com") {
      navigate("/dashboard/overview"); // 👈 redirect to dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[480px]">
        <h2 className="text-center text-[29px] popreg font-semibold text-gray-800 mb-2">
          Login to Account
        </h2>
        <p className="text-center popreg text-sm text-gray-500 mb-6">
          Please enter your email and password to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-600 text-sm">Email address:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-yellow-300 rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-gray-600 text-sm">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-yellow-300 rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Options */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2 popreg accent-yellow-500" />
            Remember Password
          </label>
          <button className="text-sm popreg text-red-500 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-5">
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-full hover:bg-yellow-600 transition"
          >
            Log In
          </button>
          <button className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-full hover:bg-yellow-500 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
