import { useDispatch } from "react-redux";
import ScanByCamera from "./ScanByCamera";
import UploadFromDevice from "./UploadFromDevice";
import { setImageName } from "../../slices/userSlice";

export default function ScanType({ setIsOpen, desktop = false, isOpen }) {
  const dispatch = useDispatch();

  function toggleIsOpen() {
    setIsOpen(false);
  }

  function padStart(number) {
    return number.toString().padStart(2, "0");
  }
  function setDocumentName() {
    const date = new Date();
    const documentName = `Scan ${padStart(date.getDate())}_${padStart(
      date.getMonth()
    )}_${padStart(date.getFullYear())} ${padStart(date.getHours())}_${padStart(
      date.getMinutes()
    )}_${padStart(date.getSeconds())}`;

    dispatch(setImageName(documentName));
  }

  if (desktop)
    return (
      <>
        <div
          className={`fixed  left-0 top-1/2 -translate-y-1/2 h-full px-7  flex items-center justify-center gap-5 min-w-full tansition-all ${
            isOpen && "yk"
          } `}
        >
          <div
            onClick={toggleIsOpen}
            className="fixed top-0 left-0 w-full h-full bg-blue cursor-pointer z-[-1]"
          ></div>
          <ScanByCamera
            setDocumentName={setDocumentName}
            closeModal={toggleIsOpen}
          />
          <UploadFromDevice
            setDocumentName={setDocumentName}
            closeModal={toggleIsOpen}
          />
        </div>
      </>
    );
  return (
    <div className="fixed  px-7 bottom-[110px] flex items-center justify-center gap-5 min-w-full tansition-all">
      <ScanByCamera
        setDocumentName={setDocumentName}
        closeModal={toggleIsOpen}
      />
      <UploadFromDevice
        setDocumentName={setDocumentName}
        closeModal={toggleIsOpen}
      />
    </div>
  );
}