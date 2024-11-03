import LeftChevron from "../../components/svgs/LeftChevron";
import RightChevron from "../../components/svgs/RightChevron";

export default function Pagination({ noOfPages, current, setCurrent }) {
  const pages = new Array(noOfPages || 0).fill(null);
  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        className={`${
          current === 1 ? "cursor-not-allowed" : "cursor-pointer"
        } `}
        disabled={current === 1}
        onClick={(e) => setCurrent(current - 1)}
      >
        <LeftChevron />
      </button>
      <div className="flex gap-3">
        {pages.map((_, i) => (
          <button
            onClick={(e) => setCurrent(i + 1)}
            className={`text-base ${
              current - 1 === i ? "text-black/90" : "text-black/50"
            }`}
            key={i}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        className={` ${
          current === noOfPages ? "cursor-not-allowed" : "cursor-pointer"
        } `}
        disabled={current === noOfPages}
        onClick={(e) => setCurrent(current + 1)}
      >
        <RightChevron />
      </button>
    </div>
  );
}
