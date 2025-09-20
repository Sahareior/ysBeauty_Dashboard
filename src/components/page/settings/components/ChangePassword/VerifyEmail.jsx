import React, { useRef, useState, useEffect } from "react";
import AuthCard from "./AuthCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyOtpMutation } from "../../../../../store/apis/apiSlice";
import { message } from "antd";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputsRef = useRef([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  // 4-digit OTP state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email || "";

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Handle OTP input changes
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value) {
      const newOtp = [...otp];
      newOtp[idx] = value[0]; // Only take first digit
      setOtp(newOtp);

      // Auto-focus next input
      if (idx < 3) {
        inputsRef.current[idx + 1].focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (!otp[idx] && idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[idx] = "";
      setOtp(newOtp);
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (pastedData.length === 4) {
      const newOtp = pastedData.split("").slice(0, 4);
      setOtp(newOtp);
      inputsRef.current[3].focus();
    }
  };

  // Validate OTP
  const validateOtp = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete 4-digit code");
      return false;
    }
    setError("");
    return true;
  };

  
// Verify OTP
const handleVerify = async () => {
  if (!validateOtp()) return;

  const otpCode = otp.join("");
  try {
    const result = await verifyOtp({ email, otp: otpCode }).unwrap();
    message.success("Email verified successfully!");
    
    // Navigate with both email and reset_token
    navigate("../reset-password", {
      state: { 
        email, 
        reset_token: result.reset_token // Add the reset_token from the response
      },
    });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    if (error.data && error.data.message) {
      if (
        error.data.message.includes("invalid") ||
        error.data.message.includes("expired")
      ) {
        setError("Invalid or expired verification code");
      } else {
        message.error(error.data.message);
      }
    } else {
      message.error("Failed to verify OTP. Please try again.");
    }
  }
};

  // Resend OTP
  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    setError("");
    inputsRef.current[0].focus();
    message.info("New verification code sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Verify Email">
        <p className="mb-6 text-gray-600 text-center">
          Please enter the <span className="font-semibold text-yellow-400">4-digit</span>{" "}
          code sent to <span className="font-medium">{email || "your email"}</span>.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {Array.from({ length: 4 }).map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={otp[i]}
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 text-xl font-semibold text-center bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Resend */}
        <p className="text-gray-500 text-sm text-center">
          Didn't receive the code?{" "}
          {canResend ? (
            <span
              className="text-yellow-500 font-medium cursor-pointer hover:underline"
              onClick={handleResend}
            >
              Resend
            </span>
          ) : (
            <span className="text-gray-400">Resend in {countdown}s</span>
          )}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading}
          className={`w-full mt-6 h-12 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold tracking-wide shadow-lg transition-all ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-500 hover:to-yellow-600"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Back button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Back
          </button>
        </div>
      </AuthCard>
    </div>
  );
};

export default VerifyEmail;
