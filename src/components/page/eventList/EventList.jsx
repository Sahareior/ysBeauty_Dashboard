import React, { useState } from "react";
import EventTable from "../REUSEABLE/EventTable.JSX";
import { Button } from "antd";
import Header from "../REUSEABLE/Header";
import { useGetAllEventsQuery } from "../../../store/apis/apiSlice";
import { useLocation } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const EventList = () => {
  const { data: allEvents } = useGetAllEventsQuery();
  const location = useLocation();

  const [showAll, setShowAll] = useState(false);

  let dataTobeSend;

  if (!showAll && location.state?.filteredEvents) {
    dataTobeSend = location.state.filteredEvents;
  } else {
    dataTobeSend = allEvents;
  }

  return (
    <div>
      <Header heading="Event List" />
      <div className="flex justify-between items-center mt-6 ">
        {/* Show See All button only if filtered data exists */}
        {location.state?.filteredEvents && !showAll && (
          <Button type="ghost bg-white flex items-center justify-center" onClick={() => setShowAll(true)}>
          <FaEye className="mt-1" />  See All Events
          </Button>
        )}
      </div>

      <div className="mt-3">
        <EventTable setShowAll={setShowAll} eventData={dataTobeSend} />
      </div>
    </div>
  );
};

export default EventList;
