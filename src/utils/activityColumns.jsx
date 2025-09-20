import { Button, Dropdown, Menu, Tag } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";



export const getActivityColumns =(handelDeleteUser)=> [
    { 
      title: "#ID", 
      dataIndex: "id", 
      key: "id", 
      render: (text) => <span className="popmed text-[18px]">{text}</span> 
    },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name", 
      render: (text) => <span className="popmed text-[18px]">{text || "N/A"}</span> 
    },
    { 
      title: "Email", 
      dataIndex: "email", 
      key: "email", 
      render: (text) => <span className="popmed text-[18px]">{text}</span> 
    },
    { 
      title: "Phone", 
      dataIndex: "phone", 
      key: "phone", 
      render: (text) => <span className="popmed text-[18px]">{text || "N/A"}</span> 
    },
    { 
      title: "Join Date", 
      dataIndex: "displayJoinDate", 
      key: "joinDate", 
      render: (text) => <span className="popmed text-[18px]">{text}</span> 
    },
    {
      title: "Status",
      dataIndex: "displayStatus",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
     
              <Menu.Divider />
              <Menu.Item key="deactivate" onClick={()=> handelDeleteUser(record.id)} danger>Delete</Menu.Item>
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
  ]
