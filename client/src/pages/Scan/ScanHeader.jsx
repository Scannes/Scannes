import SearchSvg from "../../components/svgs/SearchSvg";
import BackSvg from "../../components/svgs/BackSvg";
import { useNavigate } from "react-router-dom";
export default function ScanHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-black/5">
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => navigate(-1)}
          className="cursor-pointer transition-all hover:opacity-50"
        >
          <BackSvg width={24} height={25} />
        </button>
        <h3 className="text-blue text-2xl">Scanner</h3>
      </div>
      {/* <button className="cursor-pointer transition-all hover:opacity-50">
        <SearchSvg width={30} height={30} />
      </button> */}
    </div>
  );
}
