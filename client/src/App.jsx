import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login/Login";
import OnBoard from "./pages/OnBoard/OnBoard";
import Scan from "./pages/Scan/Scan";
import Settings from "./pages/Settings/Settings";
import SolidScan from "./pages/SolidScan/SolidScan";
import Recent from "./pages/Recent/Recent";
import Admin from "./pages/Admin/Admin";
import AdminRecent from "./pages/AdminRecent/AdminRecent";
import Company from "./pages/Company/Company";
import Error from "./components/error/Error";
import Crop from "./pages/Crop/Crop";
import {} from "./utils/userApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Month from "./pages/Month/Month";
import { toggleCamera } from "./slices/userSlice";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/onboard",
        element: <OnBoard />,
      },
      {
        path: "/",
        element: <Scan />,
      },
      // {
      //   path: "/solid-scan",
      //   element: <SolidScan />,
      // },
      {
        path: "/crop",
        element: <Crop />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/recent",
        element: <Recent />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminRecent />,
          },
          {
            path: "/admin/month/:month",
            element: <Month />,
          },

          {
            path: "/admin/:company",
            element: <Company />,
          },
          {
            path: "/admin/month/:company/:month",
            element: <Month />,
          },
        ],
      },
    ],

    errorElement: <Error />,
  },
]);

export default function App() {
  const startup = localStorage.getItem("cameraAtStartup");
  const walkthrough = localStorage.getItem("walkthrough") == "true";
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (walkthrough && window.location.pathname !== "/onboard") {
      window.location = "onboard";
    }
    if (
      startup == "true" &&
      window.location.pathname != "/" &&
      window.innerWidth <= 768 &&
      user?.role == "user"
    ) {
      window.location = "/";
      // dispatch(toggleCamera(startup == "true"));
    }
  }, [startup, user?.role, walkthrough]);

  return <RouterProvider router={router} />;
}
