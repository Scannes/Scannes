import { useDispatch, useSelector } from "react-redux";
import NewBlankDocumentSvg from "../../components/svgs/NewBlankDocumentSvg";
import PlusSvg from "../../components/svgs/PlusSvg";
import ScanImagesExists from "./ScanImagesExists";
import handleImageUpload from "./handleImageUpload";
import { useState } from "react";
import categories from "../../utils/categories";
import UpChevron from "../../components/svgs/UpChevron";
import { uploadPdf } from "../../utils/userApi";
import { setError } from "../../slices/errorSlice";

export default function Documents() {
  const orignalImages = useSelector((state) => state.user.orignalImage);
  const croppedImgs = useSelector((state) => state.user.croppedImg);
  const documentName = useSelector((state) => state.user.imageName);
  const images = croppedImgs.length > 0 ? croppedImgs : orignalImages;

  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("none");
  const [pdf, setPdf] = useState(null);
  const dispatch = useDispatch();

  function handlePdfUpload(e) {
    const target = e.target;
    if (!target) return;

    const file = target.files[0];
    function padStart(number) {
      return number.toString().padStart(2, "0");
    }
    if (file) {
      const date = new Date();
      const documentName = `Scan ${padStart(date.getDate())}_${padStart(
        date.getMonth()
      )}_${padStart(date.getFullYear())} ${padStart(
        date.getHours()
      )}_${padStart(date.getMinutes())}_${padStart(date.getSeconds())}`;

      // Create a new File with the desired name
      const renamedFile = new File([file], documentName + ".pdf", {
        type: file.type,
      });

      // Set the renamed file to the state
      setPdf(renamedFile);
    }
  }

  function upload() {
    if (category === "none") {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message: "Category is required",
        })
      );
    } else {
      setIsUploading(true);
      uploadPdf(pdf, category, setIsUploading);
    }
  }
  if (pdf)
    return (
      <div className="flex flex-col  items-center justify-center mt-10 gap-3">
        <h4>Wählen Sie die Kategorie für Ihr PDF aus.</h4>
        <div className="h-[45px] w-[180px]  relative block">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`bg-blue outline-none py-3 pl-[20px] pr-[40px] h-full w-full rounded-lg  text-white flex items-center justify-center gap-3 text-[16px] cursor-pointer appearance-none`}
          >
            <option value="none" className="bg-white text-blue hidden ">
              Categories
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-white text-blue "
              >
                {category}
              </option>
            ))}
          </select>
          <div className="absolute top-1/2 -translate-y-1/2 right-[25px] rotate-180">
            <UpChevron height={15} width={15} />
          </div>
        </div>
        <button
          onClick={() => setPdf("")}
          className="bg-red-500 w-[180px] outline-none py-1 rounded-md text-white"
        >
          Abbrechen
        </button>
        <button
          onClick={upload}
          className="bg-blue w-[180px] outline-none py-1 rounded-md text-white"
        >
          {isUploading ? "Uploading..." : "Hochladen"}
        </button>
      </div>
    );
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

      <div className="flex gap-2">
        <label
          id="file-upload"
          className="hidden md:flex text-blue  items-center cursor-pointer justify-center gap-3 border border-blue px-5 py-2.5 rounded-md"
        >
          <input
            disabled={isUploading}
            type="file"
            accept="image/*"
            className="opacity-0 hidden"
            id="file-upload"
            onChange={handleImageUpload}
            multiple={true}
          />
          <PlusSvg height={15} width={15} color="#2F4FCD" /> Hier hochladen
        </label>
        <label
          id="pdf"
          className="flex text-blue  items-center cursor-pointer justify-center gap-3 border border-blue px-5 py-2.5 rounded-md"
        >
          <input
            type="file"
            accept="application/pdf"
            className="opacity-0 hidden"
            id="pdf"
            onChange={handlePdfUpload}
          />
          <PlusSvg height={15} width={15} color="#2F4FCD" />{" "}
          {isUploading ? "Uploading..." : "PDF hochladen"}
        </label>
      </div>
    </div>
  );
}
