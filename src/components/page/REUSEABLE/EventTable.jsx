import React, { useState, useMemo } from "react";
import { Table, Button, Dropdown, Menu, Tag } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import CustomModal from "./CustomModal";
import { useActiveEventsMutation, useDeactiveEventsMutation, useDeleteUserMutation, useGetAllEventsQuery, useGetAllUsersActivitiesQuery, useGetopFiveQuery } from "../../../store/apis/apiSlice";
import Swal from "sweetalert2";
import { transformActivitiesData, transformEventData } from "../../../utils/transform";
import { getActivityColumns } from "../../../utils/activityColumns";
import { getEventColumns } from "../../../utils/eventColumns";

const EventTable = ({ path = true, activities = false, eventData = [], activitiesData = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
   const {data:users, refetch} = useGetAllUsersActivitiesQuery()
     const {data:topFive,  refetch:refetchTop} = useGetopFiveQuery()
      const {data, refetch:refetchEvents} =useGetAllEventsQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [deactiveEvents] = useDeactiveEventsMutation()
  const [activeEvents] = useActiveEventsMutation()

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





  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activities ? "Active User List" : "Event List"}
        </h2>
        <Button
          className="flex gap-2 items-center"
          onClick={() => setIsModalOpen(true)}
          type="dashed"
          size="middle"
        >
          <VscSettings /> Filters
        </Button>
      </div>

   <Table
        dataSource={
          activities
            ? transformActivitiesData(activitiesData)
            : transformEventData(eventData)
        }
        columns={
          activities
            ? getActivityColumns(handelDeleteUser)
            : getEventColumns(updateEvent)
        }
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: activities ? 1000 : 800 }}
        loading={activities ? activitiesData.length === 0 : eventData.length === 0}
      />

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        eventData={selectedEvent}
      />
    </div>
  );
};

export default EventTable;