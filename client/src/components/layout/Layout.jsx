import { Outlet } from "react-router-dom";
import ErrorComponent from "../error/ErrorComponent";

export default function Layout() {
  return (
    <div className="relative md:static">
      <ErrorComponent />
      <Outlet />
    </div>
  );
}
