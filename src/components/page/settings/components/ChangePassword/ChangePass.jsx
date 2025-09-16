import React, { use } from 'react';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
    const navigate = useNavigate();
    return (
<div className="min-h-screen flex items-center justify-center  px-4">
         <AuthCard title="Change Password">
      <p className="mb-4">Your password must be 8–10 characters long.</p>
      <div className="space-y-4">
       <div>
        <label  htmlFor="old-password">Old Password</label>
         <input
          type="password"
          placeholder="Enter old password"
          className="w-full mt-1 h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
       </div>
<div>
    <label htmlFor="new-password">New Password</label>
            <input
          type="password"
          placeholder="Set new password"
          className="w-full h-11 mt-1 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
</div>
<div>
    <label htmlFor="confirm-password">Confirm Password</label>
            <input
          type="password"
          placeholder="Re-enter new password"
          className="w-full h-11 mt-1 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
</div>
      </div>
      <p onClick={() => navigate('forgot-password')} className="text-red-500 text-sm mt-2 cursor-pointer">Forgot password?</p>
      <button className="w-full mt-6 h-11 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium">
        Update password
      </button>
    </AuthCard>
</div>
    );
};

export default ChangePass;