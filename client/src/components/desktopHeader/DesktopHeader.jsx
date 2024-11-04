import { Link, useLocation, useNavigate } from "react-router-dom";
import DocumentsSvg from "../svgs/DocumentsSvg";
import ScanSvg from "../svgs/ScanSvg";
import SettingsSvg from "../svgs/SettingsSvg";
import handleImageUpload from "../../pages/Scan/handleImageUpload";

export default function DesktopHeader() {
  return (
    <div className="w-full py-5 bg-[#f4f4f4]">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        <Link to="/">
          <img src="/Logo.png" className="h-[60px] object-cover" />
        </Link>
        <DesktopLinks />
      </div>
    </div>
  );
}

function DesktopLinks() {
  const location = useLocation()?.pathname;
  const navigate = useNavigate();
  return (
    <nav className=" flex items-center justify-evenly gap-1">
      <label
        to="/"
        id="file-upload-g"
        className={`cursor-pointer transition-all hover:opacity-50 flex items-center justify-center  gap-2 px-5 py-2 rounded-md ${
          location === "/" ? "bg-blue text-white" : "text-black"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="opacity-0 hidden"
          id="file-upload-g"
          onChange={(e) => handleImageUpload(e, true, navigate)}
          multiple={true}
        />
        <ScanSvg
          color={location === "/" ? "white" : "black"}
          width={15}
          height={15}
        />
        Scannen
      </label>
      <Link
        to="/recent"
        className={`cursor-pointer transition-all hover:opacity-50 flex items-center justify-center  gap-2 px-5 py-2 rounded-md ${
          location === "/recent" ? "bg-blue text-white" : "text-black"
        }`}
      >
        <DocumentsSvg
          color={location === "/recent" ? "white" : "black"}
          width={15}
          height={15}
        />
        Zuletzt
      </Link>
      {/* <ScanComponent /> */}
      <Link
        to="/settings"
        className={`cursor-pointer transition-all hover:opacity-50 flex items-center justify-center  gap-2 px-5 py-2 rounded-md ${
          location === "/settings" ? "bg-blue text-white" : "text-black"
        }`}
      >
        <SettingsSvg
          width={20}
          height={20}
          color={location === "/settings" ? "white" : "black"}
        />
        Einstellungen
      </Link>
    </nav>
  );
}
