import { useState } from "react";
import SolidScanHeader from "../SolidScan/SolidScanHeader";
import { useSwipeable } from "react-swipeable";
import { useDispatch } from "react-redux";
import { removeImage } from "../../slices/userSlice";

import createPdfAndUploadToServer from "../../utils/createPdfAndUploadToServer";

export default function ScanImagesExists({ images, documentName }) {
  const dispatch = useDispatch();
  const [isCropActive, setIsCropActive] = useState(false);
  const [category, setCategory] = useState("none");

  // Handle image deletion
  const handleDelete = (i) => {
    dispatch(removeImage(i)); // Remove the image from the Redux store
  };

  return (
    <div className="max-w-[1500px] block mx-auto p-5">
      <SolidScanHeader
        isCropActive={isCropActive}
        setIsCropActive={setIsCropActive}
        desktop={true}
        category={category}
        setCategory={setCategory}
      />
      {!isCropActive &&
        images.map((image, i) => (
          <div
            key={image}
            className="w-full h-full object-cover border border-[#eee] mb-3"
          >
            <SwipeableImage i={i} image={image} onDelete={handleDelete} />
          </div>
        ))}

      <button
        onClick={() =>
          createPdfAndUploadToServer(images, documentName, category, dispatch)
        }
        className="w-fit ml-auto px-10 py-2 bg-blue text-white rounded-md mt-4 hidden md:block"
      >
        Send
      </button>
    </div>
  );
}

// Swipeable image component
function SwipeableImage({ i, image, onDelete }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onDelete(i),
    onSwipedRight: () => onDelete(i),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enables swipe detection for desktop as well
  });

  return (
    <div {...handlers} className="relative">
      {/* <button
          onClick={() => onDelete(image)}
          className="bg-blue h-[25px] aspect-square rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
        >
          <CrossSvg height={12} color="#f4f4f4" />
        </button> */}
      <img
        draggable={false}
        src={image}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
