import { useState } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import UserDashboardNavbar from "../../components/userDashboardNavbar/UserDashboardNavbar";
import SolidScanBody from "./SolidScanBody";
import SolidScanHeader from "./SolidScanHeader";
import { useSelector } from "react-redux";

export default function SolidScan() {
  const isThereAnImage = useSelector((state) => state.user.orignalImage);
  const [isCropActive, setIsCropActive] = useState(false);

  return (
    <section className={`${isThereAnImage && "pb-[50px]"}`}>
      <MobileHeader />
      <SolidScanHeader
        isCropActive={isCropActive}
        setIsCropActive={setIsCropActive}
      />
      {isCropActive || <SolidScanBody />}
      {isCropActive || <UserDashboardNavbar open={true} />}
    </section>
  );
}
