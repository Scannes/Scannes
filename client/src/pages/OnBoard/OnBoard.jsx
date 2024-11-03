import { useState } from "react";
import CaptureSvg from "../../components/svgs/CaptureSvg";
import Instructions from "./Instructions";
import SwitchBetweenInstructions from "./SwitchBetweenInstructions";

export default function OnBoard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide content
  const slides = [
    {
      heading: "Scan Everywhere",
      content: "Scan documents everywhere anytime from your pocket.",
    },
    {
      heading: "Select Categories",
      content:
        "Organize and categorize your documents with ease. By just selecting a category",
    },
    {
      heading: "Share Instantly",
      content:
        "Quickly share documents with colleagues and friends by just sending it.",
    },
  ];

  // Move to the next or previous slide
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="h-screen w-full py-[10vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-between gap-[30px] max-w-[400px] h-full max-h-[550px] w-full px-3">
        <CaptureSvg height={214} width={214} />
        <Instructions heading={slides[currentSlide].heading}>
          {slides[currentSlide].content}
        </Instructions>
        <SwitchBetweenInstructions
          dots={slides.length}
          currentDot={currentSlide}
          onDotClick={handleSlideChange}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
    </section>
  );
}
