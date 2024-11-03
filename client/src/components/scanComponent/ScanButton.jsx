import PlusSvg from "../svgs/PlusSvg";
import CrossSvg from "../svgs/CrossSvg";
import { Link } from "react-router-dom";

export default function ScanButton({ isOpen, setIsOpen }) {
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <Link
      to="/"
      onClick={toggleIsOpen}
      className={`bg-blue p-3 h-[50px] ${
        isOpen ? "w-fit p-4 rounded-full" : "w-[160px] rounded-lg"
      }  text-white flex items-center justify-center gap-3 text-xl cursor-pointer`}
    >
      {isOpen ? (
        <CrossSvg height={18} width={18} />
      ) : (
        <>
          <PlusSvg height={18} width={18} />
          <span>Scan</span>
        </>
      )}
    </Link>
  );
}
