import { useNavigate } from "react-router-dom";
import BackSvg from "../../components/svgs/BackSvg";
export default function SettingsHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 bg-black/5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer transition-all hover:opacity-50"
        >
          <BackSvg width={24} height={25} />
        </button>
        <h3 className="text-blue text-2xl">Settings</h3>
      </div>
    </div>
  );
}
