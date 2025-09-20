import React, { useState } from 'react';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';
import { useResetPassMutation } from '../../../../../store/apis/apiSlice';
import { message } from 'antd';

const ForgotPass = () => {
  const [resetPass, { isLoading }] = useResetPassMutation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user types
    if (error) {
      setError('');
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    try {
      const result = await resetPass({ email }).unwrap();
      
      message.success('OTP sent successfully! Check your email.');
      
      // Navigate to verify email page with the email as state
      navigate('../verify-email', { state: { email } });
      
    } catch (error) {
      console.error('Failed to send OTP:', error);
      
      if (error.data && error.data.message) {
        if (error.data.message.includes('not found')) {
          setError('Email address not found');
        } else {
          message.error(error.data.message);
        }
      } else if (error.status === 400) {
        setError('Invalid email address');
      } else {
        message.error('Failed to send OTP. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Forgot Password">
        <p className="mb-4 text-gray-600">Please enter your email address to reset your password</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </AuthCard>
    </div>
  );
};

export default ForgotPass;