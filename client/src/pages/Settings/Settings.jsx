import { useState } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import SettingComponent from "./SettingComponent";
import SettingsHeader from "./SettingsHeader";
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
  const [deleteActive, setDeleteActive] = useState(false);
  const [walkThroughActive, setWalkThroughActive] = useState(
    localStorage.getItem("walkthrough") === "true"
  );
  const role = useSelector((state) => state.user?.user?.role);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // Function to detect if the device is running iOS

  function updateWalkthrough() {
    localStorage.setItem("walkthrough", !walkThroughActive);
  }

  if ((role === "admin" || role === "staff") && user) navigate("/admin");
  if (!user) navigate("/login");

  return (
    <section className="pb-[80px]">
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="md:hidden">
        <MobileHeader />
        <SettingsHeader />
      </div>
      <div className="mt-5 p-5 flex flex-col gap-4">
        {/* Conditionally render Start Camera at Startup for non-iOS devices */}
        {/* {!isIOS && (
          <SettingComponent
            active={cameraActive}
            setActive={setCameraActive}
            handler={updateCameraOnStartUp}
            svg={<CameraSvg width={30} height={25} />}
          >
            Starten Sie die Kamera beim Start.
          </SettingComponent>
        )} */}

        <SettingComponent
          active={deleteActive}
          svg={<BinSvg width={30} height={30} />}
        >
          Bestätigen Sie das Löschen durch Wischen.
        </SettingComponent>

        <SettingComponent
          active={walkThroughActive}
          setActive={setWalkThroughActive}
          handler={updateWalkthrough}
          svg={<PointerSvg width={30} height={30} />}
        >
          Zeigen Sie die Einführung beim Start.
        </SettingComponent>

        <SettingComponent
          to="#"
          svg={<PrivacyPolicySvg width={30} height={30} />}
        >
          Datenschutzerklärung,
        </SettingComponent>
        <SettingComponent
          to="#"
          svg={<TermsAndConditionsSvg width={30} height={30} />}
        >
          Allgemeine Geschäftsbedingungen
        </SettingComponent>
        <button onClick={() => logout()}>
          <SettingComponent to="#">Abmelden</SettingComponent>
        </button>
      </div>

      <div className="md:hidden">
        <UserDashboardNavbar open={false} />
      </div>
    </section>
  );
}
