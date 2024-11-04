import { useSelector } from "react-redux";
import NewBlankDocumentSvg from "../../components/svgs/NewBlankDocumentSvg";
import PlusSvg from "../../components/svgs/PlusSvg";
import ScanImagesExists from "./ScanImagesExists";
import handleImageUpload from "./handleImageUpload";

export default function Documents() {
  const orignalImages = useSelector((state) => state.user.orignalImage);
  const croppedImgs = useSelector((state) => state.user.croppedImg);
  const documentName = useSelector((state) => state.user.imageName);
  const images = croppedImgs.length > 0 ? croppedImgs : orignalImages;
  if (images.length > 0)
    return <ScanImagesExists documentName={documentName} images={images} />;
  return (
    <div
      className={`px-5 flex flex-col items-center justify-center min-h-[65vh] gap-10`}
    >
      <NewBlankDocumentSvg height={150} width={150} />

      <div className="max-w-[300px]">
        <h2 className="text-lg text-center text-[#9A9A9A]">
          Sie haben keine Dokumente.
        </h2>
        <p className="text-[15px] text-center text-[#9A9A9A]">
          Dokumente auf Smartphones, Tablets und Computern synchronisieren.
        </p>
      </div>

      <label
        id="file-upload"
        className="hidden md:flex text-blue  items-center cursor-pointer justify-center gap-3 border border-blue px-5 py-2.5 rounded-md"
      >
        <input
          type="file"
          accept="image/*"
          className="opacity-0 hidden"
          id="file-upload"
          onChange={handleImageUpload}
          multiple={true}
        />
        <PlusSvg height={15} width={15} color="#2F4FCD" /> Hier hochladen
      </label>
    </div>
  );
}
