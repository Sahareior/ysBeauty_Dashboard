import React from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const EventTable = () => {
  const dataSource = [
    {
      key: "1",
      name: "Book Fair",
      time: "24 Aug, 7:30am",
      location: "asethu",
    },
    {
      key: "2",
      name: "Tech Fair",
      time: "24 Aug, 7:30am",
      location: "anfher",
    },
    {
      key: "3",
      name: "Trade Fair",
      time: "24 Aug, 7:30am",
      location: "fysnte",
    },
    {
      key: "4",
      name: "Trade Fair",
      time: "24 Aug, 7:30am",
      location: "erttert",
    },
  ];

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 py-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Event List</h2>
        <Button size="small">See All</Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered={false}
      />
    </div>
  );
};

export default EventTable;
