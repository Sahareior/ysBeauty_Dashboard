import { Avatar } from 'antd';
import React from 'react';
import DashboardCard from './_components/DashboardCard';
import EventTable from '../REUSEABLE/EventTable.JSX';
import CustomCalendar from './_components/CustomCalender';
import Header from '../REUSEABLE/Header';

const Overview = () => {
  return (
    <div className="w-full">
      {/* Header */}


           <Header heading="Dashboard" subHeading=" Welcome back! Here’s a quick overview of your account." />

      {/* Quick Stats / Cards Example */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#E7FFF3] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 popmed text-sm">Active User</h4>
          <p className="text-2xl font-bold popbold text-gray-900 mt-2">1,245</p>
          <p className='popreg mt-2'>5% increase</p>
         </div>
         <img src="/images/overview/img1.png" className='w-10 h-10' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 5.png" alt="" />
        </div>
 <div className="bg-[#D6FFD6] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 popmed text-sm">New User</h4>
          <p className="text-2xl popbold font-bold text-gray-900 mt-2">1,045</p>
          <p className='popreg mt-2'>5% Increased Monthly</p>
         </div>
         <img src="/images/overview/Group (1).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 9.png" alt="" />
        </div>
 <div className="bg-[#FFF6DC] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 popreg text-sm">Events Created</h4>
          <p className="text-2xl font-bold popbold text-gray-900 mt-2">105</p>
          <p className='popreg mt-2'>10% Event creation Rate</p>
         </div>
         <img src="/images/overview/Group (2).png" className='w-8 h-8' alt="" />
       </div>
       <img className='mt-2' src="/images/overview/Vector 12.png" alt="" />
        </div>

    <div className="bg-[#FFE5E5] flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition">
         <div className='flex justify-around'>
       <div>
            <h4 className="text-gray-500 text-sm popmed">Deactiveted User</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2 popbold">245</p>
          <p className='popreg mt-2'>1% Increased Monthly</p>
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


</div>

      </div>
    </div>
  );
};

export default Overview;
