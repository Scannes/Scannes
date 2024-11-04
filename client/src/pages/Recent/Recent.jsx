import { useSelector } from "react-redux";
import DesktopHeader from "../../components/desktopHeader/DesktopHeader";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import UserDashBoardNavbar from "../../components/userDashboardNavbar/UserDashboardNavbar";
import RecentDocuments from "./RecentDocuments";
import RecentHeader from "./RecentHeader";
import { useNavigate } from "react-router-dom";

export default function Recent() {
  const role = useSelector((state) => state.user?.user?.role);
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  if ((role === "admin" || role === "staff") && user) navigate("/admin");
  if (!user) navigate("/login");
  return (
    <section className="pb-[80px] md:pb-5">
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="md:hidden">
        <MobileHeader />
        <RecentHeader />
      </div>
      <RecentDocuments />
      <div className="md:hidden">
        <UserDashBoardNavbar />
      </div>
    </section>
  );
}
