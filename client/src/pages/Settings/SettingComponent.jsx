import { Link } from "react-router-dom";

export default function SettingComponent({
  svg,
  children,
  active,
  setActive = () => {},
  to = "",
  handler = () => {},
}) {
  if (to)
    return (
      <Link
        to={to}
        className="bg-[#f2f2f2] px-5 py-6 shadow-md rounded-xl flex items-center justify-between gap-2"
      >
        <div className="flex items-center justify-center gap-1">
          <span className="w-8">{svg}</span>
          <p>{children}</p>
        </div>
      </Link>
    );

  function toggleActive() {
    setActive(!active);
  }
  return (
    <div className="bg-[#f2f2f2] px-5 py-6 shadow-md rounded-xl flex items-center justify-between gap-2">
      <div className="flex items-center justify-center gap-1">
        <span className="w-8 ">{svg}</span>
        <p>{children}</p>
      </div>
      <button
        onClick={() => {
          toggleActive();
          handler();
        }}
        className={`${
          active ? "bg-blue" : "bg-[#E5E5EA]"
        } relative p-4 border  w-[70px] rounded-full transition-all cursor-pointer`}
        style={{
          boxShadow: "0px 0px 10px 2px #ccc ",
        }}
      >
        <span
          className={`transition-all absolute top-1/2 -translate-y-1/2 ${
            active ? "left-[67px] -translate-x-[100%] " : "left-[3px]"
          } h-[28px] aspect-square bg-white shadow-lg rounded-full`}
        ></span>
      </button>
    </div>
  );
}
