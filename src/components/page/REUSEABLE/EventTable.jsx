import React, { useState, useMemo } from "react";
import { Table, Button, Dropdown, Menu, Tag } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import CustomModal from "./CustomModal";
import { useActiveEventsMutation, useDeactiveEventsMutation, useDeleteUserMutation, useEventDeleteMutation, useGetAllEventsQuery, useGetAllUsersActivitiesQuery, useGetopFiveQuery } from "../../../store/apis/apiSlice";
import Swal from "sweetalert2";
import { transformActivitiesData, transformEventData } from "../../../utils/transform";
import { getActivityColumns } from "../../../utils/activityColumns";
import { getEventColumns } from "../../../utils/eventColumns";
import dayjs from "dayjs";

const EventTable = ({ path = true, activities = false, eventData = [], activitiesData = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    eventName: "",
    userName: "",
    userEmail: ""
  });
  
  const {data:users, refetch} = useGetAllUsersActivitiesQuery()
  const {data:topFive,  refetch:refetchTop} = useGetopFiveQuery()
  const {data, refetch:refetchEvents} =useGetAllEventsQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [deactiveEvents] = useDeactiveEventsMutation()
  const [activeEvents] = useActiveEventsMutation()
  const [eventDelete] = useEventDeleteMutation()

  // Filter events data
  const filteredEvents = useMemo(() => {
    if (!eventData || eventData.length === 0) return [];
    
    let filtered = eventData;
    
    // Filter by date range - FIXED LOGIC
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(event => {
        try {
          // Convert to Day.js objects
          const eventDate = dayjs(event.date);
          const startDate = dayjs(filters.startDate);
          const endDate = dayjs(filters.endDate);
          
          // Check if dates are valid
          if (!eventDate.isValid() || !startDate.isValid() || !endDate.isValid()) {
            console.warn('Invalid date detected:', { eventDate: event.date, startDate: filters.startDate, endDate: filters.endDate });
            return true; // Include event if date parsing fails
          }
          
          // CORRECTED: Check if event date is between start and end dates (inclusive)
          return eventDate.isSame(startDate, 'day') || 
                 eventDate.isSame(endDate, 'day') || 
                 (eventDate.isAfter(startDate, 'day') && eventDate.isBefore(endDate, 'day'));
        } catch (error) {
          console.error('Error filtering by date:', error);
          return true; // Include event if there's an error
        }
      });
    }
    
    // Filter by event name (case-insensitive partial match)
    if (filters.eventName && filters.eventName.trim() !== "") {
      filtered = filtered.filter(event => {
        if (!event.event_name) return false;
        return event.event_name.toLowerCase().includes(filters.eventName.toLowerCase().trim());
      });
    }
    
    console.log('Filtered events:', filtered);
    return filtered;
  }, [eventData, filters]);

  // Filter activities data
  const filteredActivities = useMemo(() => {
    if (!activitiesData || activitiesData.length === 0) return [];
    
    let filtered = activitiesData;
    
    // Filter by date range (using created_at) - FIXED LOGIC
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(activity => {
        try {
          // Convert to Day.js objects
          const activityDate = dayjs(activity.created_at);
          const startDate = dayjs(filters.startDate);
          const endDate = dayjs(filters.endDate);
          
          // Check if dates are valid
          if (!activityDate.isValid() || !startDate.isValid() || !endDate.isValid()) {
            console.warn('Invalid date detected for activity:', { activityDate: activity.created_at, startDate: filters.startDate, endDate: filters.endDate });
            return true; // Include activity if date parsing fails
          }
          
          // CORRECTED: Check if activity date is between start and end dates (inclusive)
          return activityDate.isSame(startDate, 'day') || 
                 activityDate.isSame(endDate, 'day') || 
                 (activityDate.isAfter(startDate, 'day') && activityDate.isBefore(endDate, 'day'));
        } catch (error) {
          console.error('Error filtering activity by date:', error);
          return true; // Include activity if there's an error
        }
      });
    }
    
    // Filter by user name (case-insensitive partial match)
    if (filters.userName && filters.userName.trim() !== "") {
      filtered = filtered.filter(activity => {
        if (!activity.first_name) return false;
        return activity.first_name.toLowerCase().includes(filters.userName.toLowerCase().trim());
      });
    }
    
    // Filter by user email (case-insensitive partial match)
    if (filters.userEmail && filters.userEmail.trim() !== "") {
      filtered = filtered.filter(activity => {
        if (!activity.email) return false;
        return activity.email.toLowerCase().includes(filters.userEmail.toLowerCase().trim());
      });
    }
    
    console.log('Filtered activities:', filtered);
    return filtered;
  }, [activitiesData, filters]);

  const handleApplyFilters = (filterData) => {
    console.log("Applying filters:", filterData);
    setFilters({
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      eventName: filterData.eventName || "",
      userName: filterData.userName || "",
      userEmail: filterData.userEmail || ""
    });
  };

  // Debug: Log the filtered results
  console.log("Filters:", filters);
  console.log("Original events:", eventData?.length);
  console.log("Filtered events:", filteredEvents?.length);
  console.log("Original activities:", activitiesData?.length);
  console.log("Filtered activities:", filteredActivities?.length);

  const updateEvent = async (id, type) => {
    try {
      console.log("Updating event:", id, "Type:", type);
      let res;
      if(type === 'active'){
        res = await activeEvents (id).unwrap()
      }
      else{
        res = await deactiveEvents(id).unwrap();
      }
  
      console.log("Response:", res);
      Swal.fire("Success", `Event marked as ${type}`, "success");
      refetchTop(); 
      refetchEvents()
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update event", "error");
    }
  };

  const handelDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id).unwrap(); 
          refetch()
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handelDeleteEvent = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eventDelete(id).unwrap(); 
          refetchEvents()
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activities ? "Active User List" : "Event List"}
        </h2>
        <div className="flex items-center gap-4">
          {/* Show active filter count */}
          {(filters.eventName || filters.userName || filters.userEmail || filters.startDate) && (
            <Tag color="blue">
              {activities 
                ? `Showing ${filteredActivities.length} of ${activitiesData?.length || 0} activities`
                : `Showing ${filteredEvents.length} of ${eventData?.length || 0} events`
              }
            </Tag>
          )}

          {/* Reset Filters Button */}
          {(filters.eventName || filters.userName || filters.userEmail || filters.startDate) && (
            <Button
              onClick={() =>
                setFilters({
                  startDate: null,
                  endDate: null,
                  eventName: "",
                  userName: "",
                  userEmail: "",
                })
              }
              danger
              size="middle"
            >
              Reset Filters
            </Button>
          )}

          {/* Open Filters Modal */}
          <Button
            className="flex gap-2 items-center"
            onClick={() => setIsModalOpen(true)}
            type="dashed"
            size="middle"
          >
            <VscSettings /> Filters
          </Button>
        </div>
      </div>

      <Table
        dataSource={
          activities
            ? transformActivitiesData(filteredActivities)
            : transformEventData(filteredEvents)
        }
        columns={
          activities
            ? getActivityColumns(handelDeleteUser)
            : getEventColumns(updateEvent, handelDeleteEvent)
        }
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: activities ? 1000 : 800 }}
        // loading={activities ? activitiesData.length === 0 : eventData.length === 0}
      />

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onApply={handleApplyFilters}
        activities={activities}
      />
    </div>
  );
};

export default EventTable;