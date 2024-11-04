import { useState } from "react";
import CaptureSvg from "../../components/svgs/CaptureSvg";
import Instructions from "./Instructions";
import SwitchBetweenInstructions from "./SwitchBetweenInstructions";

export default function OnBoard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide content
  const slides = [
    {
      heading: "Dokumente scannen/hochladen",
      content: "Scanne deine Dokumente oder wähle sie aus deiner Galerie aus.",
    },
    {
      heading: "Kategorie auswählen",
      content: "Wähle die passende Kategorie aus.",
    },
    {
      heading: "Dokumente senden",
      content: "Ganz einfach per Knopfdruck die ausgewählten Dokumente senden.",
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
