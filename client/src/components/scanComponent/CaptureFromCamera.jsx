import CrossSvg from "../svgs/CrossSvg";

export default function CaptureFromCamera({
  videoRef,
  captureImage,
  stopCamera,
}) {
  return (
    <>
      {/* Background overlay */}
      <div className="fixed top-0 left-0 w-full h-full z-[90000] bg-black/90 camera-is-open"></div>

      {/* Video container */}
      <div className="fixed inset-0 z-[100000] flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full object-cover"
          style={{ position: "absolute" }}
        />

        {/* Capture button */}
        <button
          onClick={captureImage}
          className="absolute bg-white outline-offset-[5px] outline outline-3 outline-white  bottom-4 bg-blue-500 py-1 px-4  z-[100001] rounded-full h-[40px] p-3  aspect-square"
        ></button>

        {/* Close button */}
        <button
          onClick={stopCamera}
          className="absolute top-4 right-4 text-red-600 z-[100001]"
        >
          <CrossSvg height={20} width={20} />
        </button>
      </div>
    </>
  );
}
