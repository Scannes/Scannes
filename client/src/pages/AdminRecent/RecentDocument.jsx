import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function RecentDocument({
  src,
  index,
  zIndex,
  path,
  slider = false,
}) {
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
      className={`overflow-hidden bg-white border border-black mb-5 w-[64%] absolute top-0 left-[0px] `}
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
        className="max-h-[200px] h-full w-full aspect-square object-cover object-left-top"
      />
    </Link>
  );
}
