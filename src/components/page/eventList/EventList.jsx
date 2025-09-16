import React from 'react';
import EventTable from '../REUSEABLE/EventTable.JSX';
import { Avatar } from 'antd';
import Header from '../REUSEABLE/Header';

const EventList = () => {
  
    return (
        <div>
            <Header heading="Event List" />
      <div className='mt-28'>
        <EventTable />
      </div>
        </div>
    );
};

export default EventList;