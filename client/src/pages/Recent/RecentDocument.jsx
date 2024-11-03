import { Link } from "react-router-dom";
import formatDate from "./formatDate";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function RecentDocument({
  name,
  src,
  path,
  date,
  pages,
  index,
  zIndex,
  slider = false,
}) {
  const uploadDate = formatDate(date);

  const scale = 100 - (index - 1) * 15;
  if (slider)
    return (
      <div className="p-2 h-full">
        <Link
          to={`${BACKEND_URL}/file/${path}`}
          className="h-full"
          target="_blank"
        >
          <img
            src={`${BACKEND_URL}/img/${src}`}
            className="h-[300px] w-full  object-cover object-left-top "
          />
        </Link>
      </div>
    );
  return (
    <Link
      to={`${BACKEND_URL}/file/${path}`}
      target="_blank"
      className={`overflow-hidden bg-white rounded-lg mb-5 w-[64%] absolute top-0 left-[0px] `}
      style={{
        boxShadow: "0px 0px 5px rgba(0,0,0,.3)",
        transform: `translatex(${index * 35}%) translateY(-50%) scale(${
          (scale - 15) / 100
        })`,
        zIndex: zIndex,

        top: "50%",
      }}
    >
      <img
        src={`${BACKEND_URL}/img/${src}`}
        alt={`Image of ${name}`}
        className="max-h-[150px] aspect-square h-full w-full object-cover object-center"
      />
      <div className="px-4 py-4">
        <h4 className="text-lg line-clamp-1 font-medium">{name}</h4>

        <div className="flex items-center justify-between">
          <p className="text-[#9A9A9A] capitalize">{uploadDate} </p>
          <p>
            {pages} {pages > 1 ? "Pages" : "Page"}
          </p>
        </div>
      </div>
    </Link>
  );
}
