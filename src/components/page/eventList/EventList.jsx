import React from 'react';
import EventTable from '../REUSEABLE/EventTable.JSX';
import { Avatar } from 'antd';
import Header from '../REUSEABLE/Header';
import { useGetAllEventsQuery } from '../../../store/apis/apiSlice';

const EventList = () => {
  const {data} =useGetAllEventsQuery()
  console.log(data,'adad')
    return (
        <div>
            <Header heading="Event List" />
      <div className='mt-28'>
        <EventTable eventData={data} />
      </div>
        </div>
    );
};

export default EventList;