import React, { useRef } from "react";
import AuthCard from "./AuthCard";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  // Move focus automatically
  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (value && idx < 4) {
      inputsRef.current[idx + 1].focus();
    }
  };

  // Backspace auto-focus previous
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <AuthCard title="Verify Email">
        <p className="mb-6 text-gray-300 text-center">
          Please enter the <span className="font-semibold text-yellow-400">5-digit</span> code
          we sent to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 text-xl font-semibold text-center bg-gray-200 border border-gray-400 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none text-black"
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-gray-400 text-sm text-center">
          Didn’t receive the code?{" "}
          <span className="text-yellow-400 font-medium cursor-pointer hover:underline">
            Resend
          </span>
        </p>

        {/* Verify Button */}
        <button
          onClick={() => navigate("../reset-password")}
          className="w-full mt-6 h-12 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold tracking-wide shadow-lg transition-all"
        >
          Verify
        </button>
      </AuthCard>
    </div>
  );
};

export default VerifyEmail;
