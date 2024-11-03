import ScanButton from "./ScanButton";
import ScanType from "./ScanType";

export default function ScanComponent({ isOpen, setIsOpen }) {
  return (
    <>
      <ScanButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <ScanType setIsOpen={setIsOpen} />}
    </>
  );
}
