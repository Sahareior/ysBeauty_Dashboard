import React, { useState } from "react";
import { Modal, DatePicker, Input, Button, Space } from "antd";
import dayjs from "dayjs";

const CustomModal = ({ isModalOpen, setIsModalOpen, onApply, activities = false }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setEventName("");
    setUserName("");
    setUserEmail("");
  };

  const handleApply = () => {
    if (onApply) {
      onApply({ 
        startDate,
        endDate,
        eventName,
        userName,
        userEmail 
      });
    }
    setIsModalOpen(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <Modal
      title={
        <div>
          <h2 className="text-xl text-center font-bold">
            {activities ? "Filter Activities" : "Filter Events"}
          </h2>
        </div>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={350}
    >
      {/* Wrap content in a div with onKeyPress */}
      <div onKeyPress={handleKeyPress}>
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <div className="flex gap-2">
              <DatePicker
                value={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full"
                placeholder="Start Date"
                onKeyPress={handleKeyPress}
              />
              <DatePicker
                value={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full"
                placeholder="End Date"
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          {/* Event Name (for events only) */}
          {!activities && (
            <div>
              <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <Input
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

          {/* User Name (for activities only) */}
          {activities && (
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <Input
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

          {/* User Email (for activities only) */}
          {activities && (
            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">
                User Email
              </label>
              <Input
                placeholder="User Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <Button onClick={handleReset}>Reset</Button>
            <Button type="primary" onClick={handleApply} style={{ backgroundColor: "#CBA135", borderColor: "#CBA135" }}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;