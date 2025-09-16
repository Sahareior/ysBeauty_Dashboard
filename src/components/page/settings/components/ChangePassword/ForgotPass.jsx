import React from 'react';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const navigate = useNavigate()
    return (
                <div className="min-h-screen flex items-center justify-center  px-4">

                <AuthCard title="Forgot Password">
      <p className="mb-4">Please enter your email address to reset your password</p>
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
        type="email"
        placeholder="Enter your email"
        className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
</div>
      <button onClick={() => navigate('../verify-email')} className="w-full mt-6 h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium">
        Send OTP
      </button>
    </AuthCard>
        </div>
    );
};

export default ForgotPass;