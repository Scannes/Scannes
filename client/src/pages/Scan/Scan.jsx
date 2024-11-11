import { useSelector } from "react-redux";
import DesktopHeader from "../../components/desktopHeader/DesktopHeader";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import UserDashBoardNavbar from "../../components/userDashboardNavbar/UserDashboardNavbar";

import Documents from "./Documents";
import ScanHeader from "./ScanHeader";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const role = useSelector((state) => state.user?.user?.role);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  if ((role === "admin" || role === "staff") && user) navigate("/admin");
  if (!user) navigate("/login");
  return (
    <div className="pb-[150px]">
      <div className="md:hidden">{/* <MobileHeader /> */}</div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      <div className="md:hidden">
        <ScanHeader />
      </div>
      <Documents />
      <div className="md:hidden">
        <UserDashBoardNavbar open={false} />
      </div>
    </div>
  );
}
