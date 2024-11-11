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
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function Documents() {
  const originalImages = useSelector((state) => state.user.orignalImage);
  const croppedImgs = useSelector((state) => state.user.croppedImg);
  const documentName = useSelector((state) => state.user.imageName);
  const images = croppedImgs.length > 0 ? croppedImgs : originalImages;

  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("none");
  const [pdf, setPdf] = useState(null);
  const dispatch = useDispatch();

  async function handlePdfUpload(e) {
    const target = e.target;
    if (!target) return;

    const file = target.files[0];

    function padStart(number) {
      return number.toString().padStart(2, "0");
    }

    if (file && file.type === "application/pdf") {
      const date = new Date();
      const documentName = `Scan ${padStart(date.getDate())}_${padStart(
        date.getMonth() + 1 // Months are zero-indexed
      )}_${padStart(date.getFullYear())} ${padStart(
        date.getHours()
      )}_${padStart(date.getMinutes())}_${padStart(date.getSeconds())}`;

      // Read and process the uploaded PDF file
      const fileBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);

      // Embed font for text overlay
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add text overlay on each page
      const pages = pdfDoc.getPages();
      const overlayText = `KREDITOR, ${padStart(date.getDate())}.${padStart(
        date.getMonth() + 1
      )}.${padStart(date.getFullYear())}`;

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(overlayText, 20);
        const textHeight = 20;

        // Draw the red box
        page.drawRectangle({
          x: (width - textWidth - 20) / 2,
          y: height - textHeight - 20,
          width: textWidth + 20,
          height: textHeight + 10,
          borderColor: rgb(1, 0, 0), // Red color
          borderWidth: 2,
          // color: rgb(1, 0, 0), // Red
        });

        // Draw the text
        page.drawText(overlayText, {
          x: (width - textWidth) / 2,
          y: height - textHeight - 15,
          size: 20,
          font: font,
          color: rgb(1, 0, 0), // White
        });
      });

      // Save the updated PDF
      const pdfBytes = await pdfDoc.save();
      const updatedFile = new File([pdfBytes], `${documentName}.pdf`, {
        type: "application/pdf",
      });

      setPdf(updatedFile);
    } else {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message: "Please upload a valid PDF file.",
        })
      );
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
      return;
    }

    if (!pdf) {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message: "No PDF to upload.",
        })
      );
      return;
    }

    setIsUploading(true);
    uploadPdf(pdf, category, setIsUploading)
      .then(() => {
        setPdf(null);
      })
      .catch(() => {
        dispatch(
          setError({
            isError: true,
            isActive: true,
            message: "Upload failed.",
          })
        );
      });
  }

  if (pdf) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 gap-3">
        <h4>Wählen Sie die Kategorie für Ihr PDF aus.</h4>
        <div className="h-[45px] w-[180px] relative block">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-blue outline-none py-3 pl-[20px] pr-[40px] h-full w-full rounded-lg text-white flex items-center justify-center gap-3 text-[16px] cursor-pointer appearance-none"
          >
            <option value="none" className="bg-white text-blue hidden">
              Categories
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white text-blue">
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute top-1/2 -translate-y-1/2 right-[25px] rotate-180">
            <UpChevron height={15} width={15} />
          </div>
        </div>
        <button
          onClick={() => setPdf(null)}
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
  }

  if (images.length > 0) {
    return <ScanImagesExists documentName={documentName} images={images} />;
  }

  return (
    <div className="px-5 flex flex-col items-center justify-center min-h-[65vh] gap-10">
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
        <label className="hidden md:flex text-blue items-center cursor-pointer justify-center gap-3 border border-blue px-5 py-2.5 rounded-md">
          <input
            disabled={isUploading}
            type="file"
            accept="image/*"
            className="opacity-0 hidden"
            onChange={handleImageUpload}
            multiple
          />
          <PlusSvg height={15} width={15} color="#2F4FCD" /> Hier hochladen
        </label>
        <label className="flex text-blue items-center cursor-pointer justify-center gap-3 border border-blue px-5 py-2.5 rounded-md">
          <input
            type="file"
            accept="application/pdf"
            className="opacity-0 hidden"
            onChange={handlePdfUpload}
          />
          <PlusSvg height={15} width={15} color="#2F4FCD" />
          {isUploading ? "Uploading..." : "PDF hochladen"}
        </label>
      </div>
    </div>
  );
}
