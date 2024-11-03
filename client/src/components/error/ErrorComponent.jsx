import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slices/errorSlice";

export default function ErrorComponent({}) {
  const children = useSelector((state) => state.error.message);
  const isError = useSelector((state) => state.error.isError);
  const isActive = useSelector((state) => state.error.isActive);

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (isActive) {
        setTimeout(function () {
          dispatch(setError({ isError: false, isActive: false, message: "" }));
        }, 4000);
      }
    },
    [isActive, dispatch]
  );

  return (
    <div
      className={`transition-all z-[10000]  fixed ${
        isActive ? "top-[20px]" : "top-[-100px]"
      } left-1/2 -translate-x-1/2 py-5 bg- ${
        isError ? "bg-rose-500" : "bg-lime-500"
      }  text-[#000] px-5 max-w-[300px] roudned-lg`}
    >
      <p>{children}</p>
    </div>
  );
}
