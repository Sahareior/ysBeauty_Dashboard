import React, { useState } from 'react';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';
import { useChangePassMutation } from '../../../../../store/apis/apiSlice';
import { message } from 'antd';
import Swal from 'sweetalert2';

const ChangePass = () => {
  const [changePass, { isLoading }] = useChangePassMutation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    retype_password: ''
  });
  
  const [errors, setErrors] = useState({
    old_password: '',
    new_password: '',
    retype_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate old password
    if (!formData.old_password.trim()) {
      newErrors.old_password = 'Old password is required';
      isValid = false;
    }

    // Validate new password
    if (!formData.new_password.trim()) {
      newErrors.new_password = 'New password is required';
      isValid = false;
    } else if (formData.new_password.length < 8 || formData.new_password.length > 10) {
      newErrors.new_password = 'Password must be 8–10 characters long';
      isValid = false;
    }

    // Validate retype password
    if (!formData.retype_password.trim()) {
      newErrors.retype_password = 'Please confirm your password';
      isValid = false;
    } else if (formData.new_password !== formData.retype_password) {
      newErrors.retype_password = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    const result = await changePass(formData).unwrap();
    console.log(result);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Password changed successfully!",
      timer: 2000,
      showConfirmButton: false,
    });

    // Reset form
    setFormData({
      old_password: '',
      new_password: '',
      retype_password: ''
    });

  } catch (error) {
    console.error('Failed to change password:', error);

    let errorMsg = "Failed to change password. Please try again.";

    if (error.data && error.data.message) {
      errorMsg = error.data.message;
    } else if (error.status === 400) {
      errorMsg = "Invalid input. Please check your data.";
    } else if (error.status === 401) {
      setErrors(prev => ({
        ...prev,
        old_password: "Current password is incorrect"
      }));
      return; // No need to show Swal for this, handled in form
    }

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: errorMsg,
    });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AuthCard title="Change Password">
        <p className="mb-4 text-gray-600">Your password must be 8–10 characters long.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              placeholder="Enter old password"
              className={`w-full mt-1 h-11 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.old_password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.old_password && (
              <p className="mt-1 text-sm text-red-600">{errors.old_password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Set new password"
              className={`w-full h-11 mt-1 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.new_password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-600">{errors.new_password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="retype_password"
              value={formData.retype_password}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className={`w-full h-11 mt-1 px-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.retype_password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.retype_password && (
              <p className="mt-1 text-sm text-red-600">{errors.retype_password}</p>
            )}
          </div>
          
          <p 
            onClick={() => navigate('forgot-password')} 
            className="text-red-500 text-sm mt-2 cursor-pointer hover:text-red-600 transition-colors"
          >
            Forgot password?
          </p>
          
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 h-11 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </AuthCard>
    </div>
  );
};

export default ChangePass;