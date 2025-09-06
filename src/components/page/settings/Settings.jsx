import React from 'react';
import Header from '../REUSEABLE/Header';
import { FaChevronRight } from 'react-icons/fa';
import { Outlet, useNavigate, useLocation, useMatch } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // Check if we are currently on a nested route
  const isChildRoute = useMatch('/settings/*') && window.location.pathname !== '/settings';

  if (isChildRoute) {
    // Only render the nested route
    return <Outlet />;
  }

  return (
    <div>
      <Header heading="WellCome Maria Cooper" subHeading="Have a great day!" />

      <div>
        <p className='text-[29px] mb-3'>Settings</p>
        <div className='w-full bg-black h-[0.2px]' />

        <div
          className='flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer'
          onClick={() => navigate('profile')} // navigate to nested route
        >
          <h3 className='text-[20px]'>Personal Information</h3>
          <FaChevronRight />
        </div>

        <div
          onClick={() => navigate('change-password')} // navigate to nested route
          className='flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer'
        >
          <h3 className='text-[20px]'>Change Password</h3>
          <FaChevronRight />
        </div>

        <div onClick={() => navigate('terms')} className='flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer'>
          <h3 className='text-[20px]'>Terms & Condition</h3>
          <FaChevronRight />
        </div>

        <div onClick={() => navigate('privacy')} className='flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-8 cursor-pointer'>
          <h3 className='text-[20px]'>Privacy Policy</h3>
          <FaChevronRight />
        </div>
      </div>

      {/* Optional: nested content if needed */}
      <Outlet />
    </div>
  );
};

export default Settings;
