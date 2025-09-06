import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineSetting } from 'react-icons/ai';

const { Header, Content, Footer, Sider } = Layout;

// Menu item helper
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const YsDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define menu items
  const items = [
    getItem('Overview', '/', <AiOutlineDashboard size={20} />),
    getItem('Event List', '/eventlist', <AiOutlineCalendar size={20} />),
    getItem('Recent Activities', '/recent-activities', <AiOutlineClockCircle size={20} />),
    getItem('Settings', '/settings', <AiOutlineSetting size={20} />),
  ];

  // Set active menu item based on current path
  const selectedKey = location.pathname === '/' ? '/' : location.pathname;

  return (
    <Layout style={{ minHeight: '100vh', background: 'white' }}>
 <Sider
  className="h-full"
  collapsible
  collapsed={collapsed}
  onCollapse={(value) => setCollapsed(value)}
  style={{
    background: "linear-gradient(to bottom, rgba(255, 253, 211, 0.61) 0%, #FFFFFE 100%)",
  }}
>
  <div className="demo-logo-vertical" />
  <img className="mx-auto mt-8" src="/images/logo.png" alt="" />

  <Menu
    selectedKeys={[selectedKey]}
    mode="inline"
    items={items}
    onClick={(e) => navigate(e.key)}
    className="mt-12 space-y-5"
    style={{
      background: "transparent", // let Sider’s gradient show through
    }}
  />
</Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px', background: '#F5F3ED' }}>
          <div
            className="h-[80vh] overflow-auto"
            style={{
              padding: 24,
              minHeight: 360,
              background: '#F5F3ED',
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default YsDashboard;
