import { useEffect, useState } from "react";
import ScanComponent from "../scanComponent/ScanComponent";
import DocumentsSvg from "../svgs/DocumentsSvg";
import SettingsSvg from "../svgs/SettingsSvg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageEditOptions from "./ImageEditOptions";
import { toggleCamera } from "../../slices/userSlice";

export default function UserDashboardNavbar({ open = false }) {
  const isThereAnImage = useSelector((state) => state.user.orignalImage);

  const cameraOpened = useSelector((state) => state.user.cameraAtStart);
  const cameraAtStartup =
    localStorage.getItem("cameraAtStartup") == "true" ? true : false;
  const [isOpen, setIsOpen] = useState(
    isThereAnImage ? (cameraAtStartup && !cameraOpened ? true : false) : open
  );

  const location = useLocation()?.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    if (cameraAtStartup && !cameraOpened) {
      console.log(cameraOpened, "cam");
      dispatch(toggleCamera(true));
    }
  }, []);
  if (isThereAnImage.length > 0) {
    return (
      <nav className="fixed z-10 left-0 bottom-0 w-full bg-gradient-to-r from-[#2A8DDC] to-[#D474EB] py-4 flex items-center justify-evenly gap-5 px-5">
        <ImageEditOptions />
      </nav>
    );
  }
  return (
    <nav className="fixed z-[20] left-0 bottom-0 w-full bg-gradient-to-r from-[#2A8DDC] to-[#D474EB] py-4 flex items-center justify-evenly gap-5">
      {!isOpen && (
        <Link
          to="/recent"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          <DocumentsSvg
            width={30}
            height={30}
            color={location === "/recent" ? "#2F4FCD" : "white"}
          />
        </Link>
      )}
      <ScanComponent isOpen={isOpen} setIsOpen={setIsOpen} />
      {!isOpen && (
        <Link
          to="/settings"
          className="cursor-pointer transition-all hover:opacity-50"
        >
          <SettingsSvg
            width={30}
            height={40}
            color={location === "/settings" ? "#2F4FCD" : "white"}
          />
        </Link>
      )}
    </nav>
  );
}
