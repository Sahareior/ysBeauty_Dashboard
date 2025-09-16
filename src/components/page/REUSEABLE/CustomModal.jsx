import React, { useState } from "react";
import { Modal, DatePicker, Input, Button, Space } from "antd";
import dayjs from "dayjs";

const CustomModal = ({ isModalOpen, setIsModalOpen, onApply }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [eventName, setEventName] = useState("");

  const handleReset = () => {
    setStartDate(dayjs());
    setEndDate(dayjs());
    setEventName("");
  };

  const handleApply = () => {
    if (onApply) {
      onApply({ startDate, endDate, eventName });
    }
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <div>
          <h2 className="text-xl text-center font-bold">Filter Events</h2>
         
        </div>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={350}
      style={{
        width: "200px",
      }}
    >
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
          />
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full"
          />
        </div>
</div>
<div>
            <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
          Event Name
                    </label>
        {/* Event Name */}
        <Input
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
</div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleApply} style={{ backgroundColor: "#CBA135", borderColor: "#CBA135" }}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
