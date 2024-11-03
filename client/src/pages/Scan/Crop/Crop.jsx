import React, { useState } from "react";
import MobileHeader from "../../../components/mobileHeader/MobileHeader";
import SolidScanHeader from "../../SolidScan/SolidScanHeader";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { PDFDocument, rgb } from "pdf-lib";
import "pdfjs-dist/web/pdf_viewer.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCropped } from "../../../slices/userSlice";

// import { GlobalWorkerOptions } from "pdfjs-dist";

export default function Crop() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState(user.orignalImage);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = React.useRef(null);

  if (!imageSrc || imageSrc.length === "0")
    window.location.href = "/solid-scan";

  console.log(!imageSrc);
  // Crop the image using Cropper.js
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    const url = croppedCanvas.toDataURL();
    setImageSrc(url);
    setCroppedImage(croppedCanvas);

    dispatch(setCropped(url));
    // navigate("/solid-scan");
  };

  // Export as PDF with padding and white background
  const exportAsPDF = async () => {
    if (!croppedImage) return;

    const pdfDoc = await PDFDocument.create();
    const padding = 70; // Add padding around the cropped image
    const pageWidth = croppedImage.width + padding * 2;
    const pageHeight = croppedImage.height + padding * 2;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: rgb(1, 1, 1),
    });

    const imageDataUrl = croppedImage.toDataURL("image/png");
    const pngImageBytes = await fetch(imageDataUrl).then((res) =>
      res.arrayBuffer()
    );
    const image = await pdfDoc.embedPng(pngImageBytes);

    page.drawImage(image, {
      x: padding,
      y: padding,
      width: croppedImage.width,
      height: croppedImage.height,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scanned_document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <MobileHeader />
      <SolidScanHeader />
      {/* <UserDashboardNavbar open={true} /> */}

      {/* Show Image and Allow Cropping */}
      {imageSrc && (
        <div className="p-5 bg-[#f4f4f4]">
          <Cropper
            src={imageSrc}
            style={{ maxHeight: "85vh", width: "100%", objectFit: "cover" }}
            aspectRatio={NaN} // Free aspect ratio (no fixed ratio)
            background={false} // Disable the dotted background
            viewMode={1} // Restrict crop box to image boundaries
            autoCropArea={1} // Default crop area to cover the entire image
            ref={cropperRef}
            guides={false} // Disable guides and dotted grid
            zoom={NaN}
            zoomOnTouch={false}
            zoomOnWheel={false}
            zoomable={false}
          />
          <button
            className="mx-auto block mt-3 bg-blue text-white px-10 py-2 rounded-lg"
            onClick={handleCrop}
          >
            Crop Image
          </button>
        </div>
      )}
    </section>
  );
}
