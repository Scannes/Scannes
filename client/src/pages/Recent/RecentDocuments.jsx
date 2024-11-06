import { useSelector } from "react-redux";
import Document from "./Document";
import RecentDocument from "./RecentDocument";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecentDocuments() {
  const user = useSelector((state) => state.user);
  const documents = user.files;

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="arrow next-arrow absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer bg-white p-3 shadow-md rounded-full w-fit"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="16"
          height="16"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          // style="enable-background:new 0 0 512 512"
        >
          <g>
            <path
              d="m17.414 10.586-8-8a2 2 0 0 0-2.828 2.828L13.172 12l-6.586 6.586a2 2 0 0 0 2.828 2.828l8-8a2 2 0 0 0 0-2.828z"
              // data-name="Chevron"
              fill="#000000"
              opacity="1"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="arrow prev-arrow absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-[68] cursor-pointer rotate-180 bg-white p-3 shadow-md rounded-full w-fit"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="16"
          height="16"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          // style="enable-background:new 0 0 512 512"
        >
          <g>
            <path
              d="m17.414 10.586-8-8a2 2 0 0 0-2.828 2.828L13.172 12l-6.586 6.586a2 2 0 0 0 2.828 2.828l8-8a2 2 0 0 0 0-2.828z"
              // data-name="Chevron"
              fill="#000000"
              opacity="1"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: documents.length >= 5 ? 5 : documents.length, // Show at most 5 slides
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (documents.length === 0)
    return (
      <h3 className="text-xl text-[#9A9A9A] font-normal text-center mt-10">
        Keine zuletzt verwendeten Dokumente
      </h3>
    );

  return (
    <div className="p-7">
      <h3 className="text-xl text-[#9A9A9A] font-normal">Zuletzt</h3>

      {/* <div className="w-full max-w-[400px] overflow-hidden relative h-[300px]">
        {documents.map(
          (document, i) =>
            i < 3 && (
              <RecentDocument
                src={document.img}
                name={document.name}
                path={document.path}
                date={document.date}
                pages={document.pages}
                index={i}
                zIndex={documents.length - i}
                key={document.name + document.time}
              />
            )
        )}
      </div> */}
      <div className="w-full max-w-[600px] h-[250px] md:max-w-full md:h-full overflow-hidden relative ">
        <div className="md:hidden">
          {documents.map(
            (document, i) =>
              i < 3 && (
                <RecentDocument
                  src={document.img}
                  name={document.name}
                  path={document.path}
                  date={document.date}
                  pages={document.pages}
                  index={i}
                  zIndex={documents.length - i}
                  key={document.name + document.time}
                />
              )
          )}
        </div>
        <div className="relative p-[20px] hidden md:block">
          {documents.length === 1 &&
            documents.map((document, i) => (
              <RecentDocument
                src={document.img}
                name={document.name}
                path={document.path}
                date={document.date}
                pages={document.pages}
                index={i}
                zIndex={documents.length - i}
                key={document.name + document.time}
                slider={true}
              />
            ))}

          {documents.length > 1 && (
            <Slider s {...settings}>
              {documents.map((document, i) => (
                <RecentDocument
                  src={document.img}
                  name={document.name}
                  path={document.path}
                  date={document.date}
                  pages={document.pages}
                  index={i}
                  zIndex={documents.length - i}
                  key={document.name + document.time}
                  slider={true}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl text-[#9A9A9A] font-normal">Dokumente</h3>

        <div className="flex gap-4 flex-col mt-3">
          {documents.map((document) => (
            <Document
              key={document.name + document.time}
              name={document.name}
              date={document.date}
              src={document.img}
              path={document.path}
              pages={document.pages}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
