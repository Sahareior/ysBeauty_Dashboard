import React from 'react';
import { Avatar } from 'antd';
import Header from '../REUSEABLE/Header';
import DashboardCard from './_components/DashboardCard';
import EventTable from '../REUSEABLE/EventTable.JSX';
import { useGetDashboardPersentageQuery, useGetDashboardStatsQuery, useGetopFiveQuery } from '../../../store/apis/apiSlice';



const Overview = () => {
  const { data } = useGetDashboardStatsQuery();
  const {data:topFive} = useGetopFiveQuery()
  const {data:persentage} = useGetDashboardPersentageQuery()


const statsConfig = [
  {
    title: 'Active User',
    key: 'total_active_users',
    bg: '#E7FFF3',
    icon: '/images/overview/img1.png',
    vector: '/images/overview/Vector 5.png',
    description: `${persentage?.users?.active?.percentage_increase ?? 0}% increase`,
  },
  {
    title: 'New User',
    key: 'new_users_monthly',
    bg: '#D6FFD6',
    icon: '/images/overview/Group (1).png',
    vector: '/images/overview/Vector 9.png',
    description: `${persentage?.users?.new?.percentage_increase ?? 0}% Increased Monthly`
  },
  {
    title: 'Events Created',
    key: 'total_events',
    bg: '#FFF6DC',
    icon: '/images/overview/Group (2).png',
    vector: '/images/overview/Vector 12.png',
    description: `${persentage?.events?.created?.percentage_increase ?? 0}% Event creation Rate`,
  },
  {
    title: 'Deactivated User',
    key: 'deactivate_user',
    bg: '#FFE5E5',
    icon: '/images/overview/Group (4).png',
    vector: '/images/overview/Vector 9.png',
    description: `${persentage?.users?.deactivated?.percentage_increase ?? 0}% Increased Monthly`,
  },
];

  return (
    <div className="w-full">
      {/* Header */}
      <Header heading="Dashboard" subHeading=" Welcome back! Here’s a quick overview of your account." />

      {/* Quick Stats / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {statsConfig.map((stat) => (
          <div
            key={stat.key}
            className="flex flex-col justify-center p-4 rounded-xl shadow hover:shadow-lg transition"
            style={{ backgroundColor: stat.bg }}
          >
            <div className="flex justify-around">
              <div>
                <h4 className="text-gray-500 popmed text-sm">{stat.title}</h4>
                <p className="text-2xl font-bold popbold text-gray-900 mt-2">
                  {data ? data[stat.key] : '-'}
                </p>
                <p className="popreg mt-2">{stat.description}</p>
              </div>
              <img src={stat.icon} className="w-8 h-8 sm:w-10 sm:h-10" alt={stat.title} />
            </div>
            <img className="mt-2" src={stat.vector} alt="" />
          </div>
        ))}
      </div>

      {/* Other Components */}
      <DashboardCard />

      <div className="flex gap-6 mt-6 mb-4">
        <div className="flex-[2] bg-white rounded-xl">
          <EventTable eventData={topFive}  />
        </div>
      </div>
    </div>
  );
};

export default Overview;
