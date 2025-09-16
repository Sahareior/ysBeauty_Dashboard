import React from 'react';
import AuthCard from './AuthCard';

const ResetPass = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
             <AuthCard title="Reset Password">
      <p className="mb-4">Your password must be 8–10 characters long.</p>
      <input
        type="password"
        placeholder="Set your password"
        className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 mb-4"
      />
      <input
        type="password"
        placeholder="Re-enter password"
        className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <button className="w-full mt-6 h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium">
        Reset Password
      </button>
    </AuthCard>
        </div>
    );
};

export default ResetPass;