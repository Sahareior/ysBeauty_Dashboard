import { Avatar } from 'antd';
import React from 'react';
import DashboardCard from './_components/DashboardCard';
import EventTable from '../REUSEABLE/EventTable.JSX';
import CustomCalendar from './_components/CustomCalender';

const Overview = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Title & Subtitle */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">
            Welcome back! Here’s a quick overview of your account.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-2/6 h-12 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
        />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src="https://joeschmoe.io/api/v1/random"
            alt="Avatar"
          />
          <div>
            <h3 className="font-medium text-gray-800">Merina</h3>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>

      {/* Quick Stats / Cards Example */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-[#E7FFF3] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
          <p>5% increase</p>
         </div>
         <img src="/images/overview/img1.png" className='w-10 h-10' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 5.png" alt="" />
        </div>
 <div className="bg-[#D6FFD6] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
          <p>5% increase</p>
         </div>
         <img src="/images/overview/Group (1).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 9.png" alt="" />
        </div>
 <div className="bg-[#FFF6DC] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
          <p>5% increase</p>
         </div>
         <img src="/images/overview/Group (2).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 12.png" alt="" />
        </div>
 <div className="bg-[#E7EAFF] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
          <p>5% increase</p>
         </div>
         <img src="/images/overview/Group (3).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 11.png" alt="" />
        </div>
    <div className="bg-[#FFE5E5] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,245</p>
          <p>5% increase</p>
         </div>
         <img src="/images/overview/Group (4).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 9.png" alt="" />
        </div>
      </div>
      <DashboardCard />
      <div>
<div className="flex gap-6 mt-6 mb-4">
  {/* Event Table */}
  <div className="flex-[2] bg-white  rounded-xl ">
    <EventTable />
  </div>

  {/* Calendar */}
  <div className="flex-[1] bg-white rounded-xl shadow-sm flex items-center justify-center">
    <CustomCalendar />
  </div>
</div>

      </div>
    </div>
  );
};

export default Overview;
