import React from 'react';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate = useNavigate()
    return (
        <div>
             <AuthCard title="Verify Email">
      <p className="mb-4">Please enter the OTP we have sent you in your email.</p>
      <div className="flex justify-between gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        Didn’t receive the code?{" "}
        <span className="text-red-500 cursor-pointer">Resend</span>
      </p>
      <button onClick={() => navigate('../reset-password')} className="w-full mt-6 h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium">
        Verify
      </button>
    </AuthCard>
        </div>
    );
};

export default VerifyEmail;