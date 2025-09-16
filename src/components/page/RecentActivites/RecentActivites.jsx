import React from 'react';
import EventTable from '../REUSEABLE/EventTable.JSX';
import { Avatar } from 'antd';
import Header from '../REUSEABLE/Header';

const RecentActivites = () => {
    return (
        <div>
        <Header heading="User activities" />
       <div className='mt-28'>
        <EventTable activities={true} />
      </div>
        </div>
    );
};

export default RecentActivites;