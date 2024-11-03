import React, { useState } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import SolidScanHeader from "../SolidScan/SolidScanHeader";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "pdfjs-dist/web/pdf_viewer.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCropped, setCropped } from "../../slices/userSlice";

// import { GlobalWorkerOptions } from "pdfjs-dist";

export default function Crop() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const images = user.orignalImage;
  const imageNo = user.imageNo;
  if (images.length === "0" || imageNo < 0) navigate(-1);
  const [imageSrc, setImageSrc] = useState(images?.at(imageNo));
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = React.useRef(null);
  const role = useSelector((state) => state.user?.user?.role);

  if (role === "admin" && user) navigate("/admin");

  if (!user) navigate("/login");
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    const url = croppedCanvas.toDataURL();
    setImageSrc(url);
    setCroppedImage(croppedCanvas);

    const croppedArr = [...images];

    console.log(croppedArr, images, "gagag");
    croppedArr[imageNo] = url;
    console.log(croppedArr);
    dispatch(removeCropped());
    croppedArr.forEach((url) => {
      dispatch(setCropped(url));
    });
    navigate(-1);
  };

  // Export as PDF with padding and white background
  return (
    <section>
      <MobileHeader />
      <SolidScanHeader />
      {/* <UserDashboardNavbar open={true} /> */}

      {/* Show Image and Allow Cropping */}
      {imageSrc && (
        <div className="p-5 bg-[#eee]">
          <Cropper
            src={imageSrc}
            style={{
              maxHeight: "85vh",
              width: "100%",
              objectFit: "cover",
            }}
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
            className="custom-croper"
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
