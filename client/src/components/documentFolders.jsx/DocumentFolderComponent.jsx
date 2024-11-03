import { Link } from "react-router-dom";
import FolderSvg from "../svgs/FolderSvg";

export default function DocumentFolderComponent({ month, company }) {
  return (
    <Link
      to={
        !company ? `/admin/month/${month}` : `/admin/month/${company}/${month}`
      }
      className="w-full cursor-pointer"
    >
      <div
        className="aspect-square min-w-[180px] max-h-[180px] w-full bg-white flex items-center justify-center rounded-lg "
        style={{
          boxShadow: "0px 0px 5px rgba(0,0,0,.4)",
        }}
      >
        <FolderSvg width={97} />
      </div>
      <p className="mt-2 font-semibold pb-[15px]">{month}</p>
    </Link>
  );
}
