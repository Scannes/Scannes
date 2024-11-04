import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CameraSvg from "../svgs/CameraSvg";
import { setCropped, setImage, toggleCamera } from "../../slices/userSlice";
import CaptureFromCamera from "./CaptureFromCamera";

export default function ScanByCamera({ setDocumentName, closeModal }) {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Start the camera
  async function startCamera() {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  }
  const cam = useSelector((state) => state.user.cameraAtStart);
  useEffect(() => {
    const cameraAtStartup = localStorage.getItem("cameraAtStartup") == "true";
    if (cameraAtStartup && !cam) {
      startCamera();
      // dispatch(toggleCamera());
    }
  }, []);

  // Capture an image from the video feed
  function captureImage() {
    const video = videoRef.current;
    if (!video) return;

    // Create a canvas to capture the image
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/png");

      // Dispatch the image to Redux store
      dispatch(setImage(url));
      dispatch(setCropped(url));

      closeModal();
      setDocumentName();

      // Stop the camera
      stopCamera();
    }
  }

  // Stop the camera stream
  function stopCamera() {
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  if (isCameraActive)
    return (
      <CaptureFromCamera
        videoRef={videoRef}
        captureImage={captureImage}
        stopCamera={stopCamera}
      />
    );
  return (
    <div
      onClick={startCamera}
      className="cursor-pointer w-full aspect-square max-h-[130px] p-1 rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-[#CFE2F7] to-[#EBDDF9]"
    >
      <CameraSvg height={28} width={28} />
      <button className="text-blue text-base font-normal mt-1">
        Open Camera
      </button>
    </div>
  );
}
