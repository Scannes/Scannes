import { Link } from "react-router-dom";
import RightArrowSvg from "../../components/svgs/RightArrowSvg";

export default function SwitchBetweenInstructions({
  dots = 0,
  currentDot,
  setCurrentSlide,
  onDotClick = () => {},
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 justify-center mb-5">
        {new Array(dots).fill(null)?.map((dot, i) => (
          <button
            onClick={() => onDotClick(i)}
            className={`h-[4px] rounded-md cursor-pointer hover:opacity-70 ${
              currentDot === i ? "w-10 bg-blue" : "w-3 bg-black/40"
            } block`}
            key={i}
          ></button>
        ))}
      </div>

      {currentDot < 2 ? (
        <button
          onClick={() => setCurrentSlide(currentDot + 1)}
          className="bg-blue w-full flex items-center justify-between text-white py-4 px-7 rounded-lg text-xl "
        >
          Next{" "}
          <span>
            <RightArrowSvg height={16} width={52} />
          </span>
        </button>
      ) : (
        <Link
          to="/"
          className="bg-blue w-full flex items-center justify-between text-white py-4 px-7 rounded-lg text-xl "
        >
          Finish
          <span>
            <RightArrowSvg height={16} width={52} />
          </span>
        </Link>
      )}
    </div>
  );
}
