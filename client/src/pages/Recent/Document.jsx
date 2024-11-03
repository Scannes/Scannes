import { Link } from "react-router-dom";
import formatDate from "./formatDate";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Document({ name, date, src, pages, path }) {
  const uploadDate = formatDate(date);

  return (
    <Link
      to={`${BACKEND_URL}/file/${path}`}
      target="_blank"
      className="bg-[#F3F3F3] flex items-center  p-4 rounded-lg gap-5 "
    >
      <img
        className="w-[60px] h-full object-cover object-top"
        src={`${BACKEND_URL}/img/${src}`}
        alt="Image of document"
        style={{
          boxShadow: "4px 4px 0px 0px #CCD1EA",
        }}
      />

      <div className="max-w-[200px] w-full pr-2">
        <h4 className="text-lg line-clamp-1 font-medium">{name}</h4>

        <div className="flex items-center justify-between">
          <p className="capitalize">{uploadDate}</p>
          <p>
            {pages} {pages > 1 ? "Pages" : "Page"}
          </p>
        </div>
      </div>
    </Link>
  );
}
