import { useDispatch } from "react-redux";
import GallerySvg from "../svgs/GallerySvg";
import { setCropped, setImage } from "../../slices/userSlice";

export default function UploadFromDevice({ setDocumentName, closeModal }) {
  const dispatch = useDispatch();
  function handleImageUpload(e) {
    e.preventDefault();
    const target = e.target;
    if (!target) return;
    const files = target?.files;

    if (files.length === 0) return;
    const urls = Object.values(files).map((file) => URL.createObjectURL(file));

    urls.forEach((url) => {
      dispatch(setImage(url));
      dispatch(setCropped(url));
    });
    closeModal();
    setDocumentName();
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden max-h-[130px] p-1 rounded-2xl flex flex-col items-center justify-center  bg-gradient-to-br from-[#CFE2F7]  to-[#EBDDF9]">
      <label
        htmlFor="file-uploads"
        className="cursor-pointer absolute top-0 left-0 w-full h-full"
      ></label>
      <input
        type="file"
        accept="image/*"
        className="opacity-0 hidden"
        id="file-uploads"
        onChange={handleImageUpload}
        multiple={true}
      />
      <GallerySvg height={28} width={28} />
      <h3 className="text-blue text-base font-normal mt-1">Gallery</h3>
    </div>
  );
}
