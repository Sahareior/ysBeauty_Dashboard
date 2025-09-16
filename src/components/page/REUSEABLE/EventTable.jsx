import React, { useState } from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import CustomModal from "./CustomModal";

const EventTable = ({ path = true, activities = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /** Default Events Data */
  const eventDataSource = [
    { key: "1", name: "Book Fair", time: "24 Aug, 7:30am", location: "Main Convention Center", status: "upcoming", render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { key: "2", name: "Tech Conference", time: "25 Aug, 9:00am", location: "Tech Hub Building", status: "ongoing", render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { key: "3", name: "Trade Exhibition", time: "26 Aug, 10:30am", location: "Expo Hall A", status: "upcoming",render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { key: "4", name: "Art Gallery Opening", time: "27 Aug, 6:00pm", location: "Downtown Gallery", status: "completed",render: (text) => <span className="popreg text-[18px]">{text}</span> },
  ];

  /** Activities Data (like screenshot) */
  const activityDataSource = Array.from({ length: 20 }, (_, i) => ({
    key: i + 1,
    user: "Martina",
    date: "20/08/2025",
    event: "Book Fair",
  }));

  /** Columns for Events */
  const eventColumns = [
    { title: "Event Name", dataIndex: "name", key: "name", render: (text) => <span className="popmed text-[18px]">{text}</span> },
    { title: "Time", dataIndex: "time", key: "time", render: (text) => <span className="popmed text-[18px]">{text}</span> },
    { title: "Location", dataIndex: "location", key: "location", render: (text) => <span className="popmed text-[18px]">{text}</span> },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="disable">Disable</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="deactivate" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<AiOutlineExclamationCircle style={{ fontSize: "20px", color: "#EAB308" }} />}
          />
        </Dropdown>
      ),
    },
  ];

  /** Columns for Activities */
  const activityColumns = [
    { title: "#SL", dataIndex: "key", key: "sl", render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { title: "User", dataIndex: "user", key: "user",render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { title: "Date", dataIndex: "date", key: "date",render: (text) => <span className="popreg text-[18px]">{text}</span> },
    { title: "Event Name", dataIndex: "event", key: "event",render: (text) => <span className="popreg text-[18px]">{text}</span> },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="disable">Disable</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="deactivate" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<AiOutlineExclamationCircle style={{ fontSize: "20px", color: "#EAB308" }} />}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activities ? "Activate User List" : "Event List"}
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
        dataSource={activities ? activityDataSource : eventDataSource}
        columns={activities ? activityColumns : eventColumns}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
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
