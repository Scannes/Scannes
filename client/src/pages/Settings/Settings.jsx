import { useState } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import SettingComponent from "./SettingComponent";
import SettingsHeader from "./SettingsHeader";
import CropSvg from "../../components/svgs/CropSvg";
import CameraSvg from "../../components/svgs/CameraSvg";
import BinSvg from "../../components/svgs/BinSvg";
import PointerSvg from "../../components/svgs/PointerSvg";
import PrivacyPolicySvg from "../../components/svgs/PrivacyPolicySvg";
import TermsAndConditionsSvg from "../../components/svgs/TermsAndConditionsSvg";
import DesktopHeader from "../../components/desktopHeader/DesktopHeader";
import UserDashboardNavbar from "../../components/userDashboardNavbar/UserDashboardNavbar";
import { logout } from "../../utils/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [galleryActive, setGalleryActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(
    localStorage.getItem("cameraAtStartup") == "true" ? true : false
  );
  const [deleteActive, setDeleteActive] = useState(false);
  const [walkThroughActive, setWalkThroughActive] = useState(
    localStorage.getItem("walkthrough") == "true" ? true : false
  );
  const role = useSelector((state) => state.user?.user?.role);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  function updateCameraOnStartUp() {
    localStorage.setItem("cameraAtStartup", !cameraActive);
    localStorage.setItem("walkthrough", false);
    setWalkThroughActive(false);
  }

  function updateWalkthrough() {
    localStorage.setItem("walkthrough", !walkThroughActive);
    localStorage.setItem("cameraAtStartup", false);
    setCameraActive(false);
  }

  if (role === "admin" && user) navigate("/admin");
  if (!user) navigate("/login");
  return (
    <section>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="md:hidden">
        <MobileHeader />
        <SettingsHeader />
      </div>
      <div className="mt-5 p-5 flex flex-col gap-4">
        {/* <SettingComponent
          active={galleryActive}
          setActive={setGalleryActive}
          svg={<CropSvg width={30} height={30} />}
        >
          Allow gallery photo editing
        </SettingComponent> */}

        <SettingComponent
          active={cameraActive}
          setActive={setCameraActive}
          handler={updateCameraOnStartUp}
          svg={<CameraSvg width={30} height={25} />}
        >
          Start camera at start up
        </SettingComponent>

        <SettingComponent
          active={deleteActive}
          // setActive={setDeleteActive}
          svg={<BinSvg width={30} height={30} />}
        >
          Confirm on swipe delete
        </SettingComponent>

        <SettingComponent
          active={walkThroughActive}
          setActive={setWalkThroughActive}
          handler={updateWalkthrough}
          svg={<PointerSvg width={30} height={30} />}
        >
          Show walkthrough at launch
        </SettingComponent>

        <SettingComponent
          to="#"
          svg={<PrivacyPolicySvg width={30} height={30} />}
        >
          Privacy Policy
        </SettingComponent>
        <SettingComponent
          to="#"
          svg={<TermsAndConditionsSvg width={30} height={30} />}
        >
          Terms & Conditions
        </SettingComponent>
        <button onClick={() => logout()}>
          <SettingComponent to="#">Logout</SettingComponent>
        </button>
      </div>

      <div className="md:hidden">
        <UserDashboardNavbar open={false} />
      </div>
    </section>
  );
}
