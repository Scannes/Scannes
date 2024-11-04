import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useSelector } from "react-redux";

export default function Admin() {
  const role = useSelector((state) => state.user?.user?.role);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  if (role !== "admin" && role !== "staff" && user) navigate("/");

  if (!user) navigate("/login");

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}
