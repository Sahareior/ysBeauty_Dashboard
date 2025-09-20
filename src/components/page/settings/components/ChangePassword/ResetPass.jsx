import React, { useState } from 'react';
import AuthCard from './AuthCard';
import { useResetChangePassMutation } from '../../../../../store/apis/apiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';

const ResetPass = () => {
  const [resetChangePass, { isLoading }] = useResetChangePassMutation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email and reset_token from navigation state
  const { email, reset_token } = location.state || {};
  
  // State for password validation
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const newpass = e.target.newpass.value;
    const confirmPass = e.target.confirmPass.value; 
    
    // Reset errors
    setPasswordError('');
    setConfirmError('');
    
    // Validation
    let isValid = true;
    
    if (newpass.length < 8 || newpass.length > 10) {
      setPasswordError("Password must be 8–10 characters long!");
      isValid = false;
    }
    
    if (newpass !== confirmPass) {
      setConfirmError("Passwords do not match!");
      isValid = false;
    }
    
    if (!isValid) return;
    
    try {
      // Call the API with required parameters
      const result = await resetChangePass({
        email,
        reset_token,
        password: newpass,
        retype_password: confirmPass
      }).unwrap();
      
      message.success("Password reset successfully!");
      navigate("/dashboard/overview"); // Redirect to login page after success
    } catch (error) {
      console.error("Failed to reset password:", error);
      if (error.data && error.data.message) {
        message.error(error.data.message);
      } else {
        message.error("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Reset Password">
        <p className="mb-4 text-gray-600">Your password must be 8–10 characters long.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Set your password"
              name="newpass"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          
          <div className="mb-2">
            <input
              type="password"
              placeholder="Re-enter password"
              name="confirmPass"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            />
            {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 h-12 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold tracking-wide shadow-lg transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-500 hover:to-yellow-600"
            }`}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
        
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

export default ResetPass;