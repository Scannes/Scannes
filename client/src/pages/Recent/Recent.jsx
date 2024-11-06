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
      <div className="max-w-[1500px] block mx-auto mt-3 ">
        <h1 className="font-semibold text-[22px] px-5 py-3 bg-gradient-to-r from-[#2A8DDC] to-[#D474EB] rounded-md mb-3 text-white">
          Willkommen zurück,{" "}
          <span className="capitalize underline ">
            {user?.name?.toLowerCase()}
          </span>
        </h1>
        <RecentDocuments />
      </div>
      <div className="md:hidden">
        <UserDashBoardNavbar />
      </div>
    </section>
  );
}
