import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import YsDashboard from './components/YsDashboard.jsx';
import Overview from './components/page/overview/Overview.jsx';
import EventList from './components/page/eventList/EventList.jsx';
import RecentActivites from './components/page/RecentActivites/RecentActivites.jsx';
import Settings from './components/page/settings/Settings.jsx';
import Profile from './components/page/settings/components/Profile.jsx';
import ChangePass from './components/page/settings/components/ChangePassword/ChangePass.jsx';
import ForgotPass from './components/page/settings/components/ChangePassword/ForgotPass.jsx';
import VerifyEmail from './components/page/settings/components/ChangePassword/VerifyEmail.jsx';
import ResetPass from './components/page/settings/components/ChangePassword/ResetPass.jsx';
import ChangePassLayout from './components/page/settings/components/ChangePassword/ChangePassLayout.jsx';
import Terms from './components/page/settings/components/TermsNConditions/Terms.jsx';
import Privacy from './components/page/settings/components/TermsNConditions/Privacy.jsx';
import Login from './components/page/auth/Login.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,   // 👈 Show login first
  },
  {
    path: "/dashboard",
    element: <YsDashboard />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "eventlist",
        element: <EventList />,
      },
      {
        path: "recent-activities",
        element: <RecentActivites />,
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "change-password",
            element: <ChangePassLayout />,
            children: [
              { index: true, element: <ChangePass /> },
              { path: "forgot-password", element: <ForgotPass /> },
              { path: "verify-email", element: <VerifyEmail /> },
              { path: "reset-password", element: <ResetPass /> },
            ],
          },
          { path: "terms", element: <Terms /> },
          { path: "privacy", element: <Privacy /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
