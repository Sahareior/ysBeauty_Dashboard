// tableConfigs/eventColumns.js
import { Button, Dropdown, Menu } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export const getEventColumns = (updateEvent) => [
  {
    title: "Event Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="popmed text-[18px]">{text}</span>,
  },
  {
    title: "Time",
    dataIndex: "displayTime",
    key: "time",
  },
  {
    title: "Location",
    dataIndex: "displayLocation",
    key: "location",
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    render: (is_active) => (
      <span
        className={`popmed text-[18px] px-2 py-1 rounded ${
          is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}
      >
        {is_active ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="toggleStatus"
              onClick={() =>
                updateEvent(record.id, record.is_active ? "deactive" : "active")
              }
            >
              {record.is_active ? "Deactivate" : "Activate"}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="delete" danger>
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button
          type="text"
          icon={
            <AiOutlineExclamationCircle
              style={{ fontSize: "20px", color: "#EAB308" }}
            />
          }
        />
      </Dropdown>
    ),
  },
];
