import React from 'react';
import Header from '../REUSEABLE/Header';
import { FaChevronRight } from 'react-icons/fa';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect if we're inside a nested child route
  const isChildRoute = location.pathname !== "/dashboard/settings";

  if (isChildRoute) {
    // Show only the nested route component
    return <Outlet />;
  }

  // Default settings list UI
  return (
    <div>
      <Header heading="WellCome Maria Cooper" subHeading="Have a great day!" />

      <div>
        <p className="text-[29px] mb-3">Settings</p>
        <div className="w-full bg-black h-[0.2px]" />

        <div
          className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer"
          onClick={() => navigate('profile')}
        >
          <h3 className="text-[20px]">Personal Information</h3>
          <FaChevronRight />
        </div>

        <div
          onClick={() => navigate('change-password')}
          className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer"
        >
          <h3 className="text-[20px]">Change Password</h3>
          <FaChevronRight />
        </div>

        <div
          onClick={() => navigate('terms')}
          className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer"
        >
          <h3 className="text-[20px]">Terms & Condition</h3>
          <FaChevronRight />
        </div>

        <div
          onClick={() => navigate('privacy')}
          className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer"
        >
          <h3 className="text-[20px]">Privacy Policy</h3>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Settings;
