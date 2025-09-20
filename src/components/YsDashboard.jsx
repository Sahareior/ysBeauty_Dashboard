import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  AiOutlineDashboard, 
  AiOutlineCalendar, 
  AiOutlineClockCircle, 
  AiOutlineSetting, 
  AiOutlineLogout 
} from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const { Content, Sider } = Layout;

// Menu item helper
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const YsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out of your account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(logout())
      navigate('/'); // redirect after logout
    }
  });
};


  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  // Define menu items
  const items = [
    getItem('Overview', '/dashboard/overview', <AiOutlineDashboard size={20} />),
    getItem('Event List', '/dashboard/eventlist', <AiOutlineCalendar size={20} />),
    getItem('Recent Activities', '/dashboard/recent-activities', <AiOutlineClockCircle size={20} />),
    getItem('Settings', '/dashboard/settings', <AiOutlineSetting size={20} />),
  ];

  // Set active menu item based on current path
  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: '100vh', background: 'white' }}>
      <Sider
        className="h-full"
         width={250} // increase this value as needed
        style={{
          background: "linear-gradient(to bottom, rgba(255, 253, 211, 0.61) 0%, #FFFFFE 100%)",
        }}
      >
        <img className="mx-auto mt-8" src="/images/logo.png" alt="Logo" />
        
        <div className='flex flex-col justify-between h-[80vh]'>
          {/* Menu */}
          <Menu
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={(e) => navigate(e.key)}
            className="mt-12 popreg text-[18px] space-y-5"
            style={{
              background: "transparent", // let Sider’s gradient show through
            }}
          />

          {/* Logout button */}
<div className="p-4 mt-auto">
  <Button
    type="primary"
    onClick={handleLogout}
    className="w-full flex items-center justify-center gap-2 bg-[#FFFDBA] text-black"
    icon={<AiOutlineLogout />}
  >
    Logout
  </Button>
</div>

        </div>
      </Sider>

      <Layout>
        <Content style={{ background: '#F5F3ED' }}>
          <div
            className="h-[98vh] overflow-auto"
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
