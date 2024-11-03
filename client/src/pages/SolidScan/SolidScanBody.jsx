import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { removeImage } from "../../slices/userSlice"; // Assuming you have a removeImage action

export default function SolidScanBody() {
  const dispatch = useDispatch();
  const orignalImg = useSelector((state) => state.user.orignalImage);
  const croppedImage = useSelector((state) => state.user.croppedImg);

  const img = croppedImage.length > 0 ? croppedImage : orignalImg;

  // Handle image deletion
  const handleDelete = (i) => {
    dispatch(removeImage(i)); // Remove the image from the Redux store
  };

  // return null if no images
  if (img.length === 0) return null;
  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-[102px] mt-5 px-5">
      {img.map((image, i) => (
        <div key={image} className="bg-[#fff] relative w-full">
          <SwipeableImage i={i} image={image} onDelete={handleDelete} />
        </div>
      ))}
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
        className="block mx-auto select-none "
      />
    </div>
  );
}
