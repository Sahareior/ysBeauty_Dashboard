import React from 'react';
import EventTable from '../REUSEABLE/EventTable.JSX';
import { Avatar } from 'antd';
import Header from '../REUSEABLE/Header';
import { useGetAllUsersActivitiesQuery } from '../../../store/apis/apiSlice';
import { data } from 'autoprefixer';

const RecentActivites = () => {
  const {data:users} = useGetAllUsersActivitiesQuery()
  console.log(users)
    return (
        <div>
        <Header heading="User activities" />
       <div className='mt-28'>
        <EventTable activities={true} activitiesData={users} />
      </div>
        </div>
    );
};

export default RecentActivites;