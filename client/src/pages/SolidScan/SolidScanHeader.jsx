import { useNavigate } from "react-router-dom";
import BackSvg from "../../components/svgs/BackSvg";
import { useDispatch, useSelector } from "react-redux";
import CropSvg from "../../components/svgs/CropSvg";
import { useState } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import { setCropped, setImage, setImageNo } from "../../slices/userSlice";
import AddSvg from "../../components/svgs/AddSvg";
import UpChevron from "../../components/svgs/UpChevron";
import categories from "../../utils/categories";
export default function SolidScanHeader({
  isCropActive,
  setIsCropActive,
  desktop = false,
  category,
  setCategory,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const name = user.imageName;
  const images = user.orignalImage;

  function goToCrop() {
    navigate("/crop");
  }

  function setImageForCrop(id) {
    dispatch(setImageNo(id));
    goToCrop();
  }
  //Handle image upload for desktop if image already exists
  function handleImageUpload(e) {
    e.preventDefault();
    const target = e.target;
    if (!target) return;
    const files = target?.files;

    if (files.length === 0) return;
    const urls = Object.values(files).map((file) => URL.createObjectURL(file));

    dispatch(setImage(urls));
    dispatch(setCropped(urls));
  }
  if (isCropActive)
    return (
      <div className="bg-white absolute top-0 left-0 w-full h-full z-20">
        <MobileHeader />
        <div className="flex items-center gap-3 bg-[#f4f4f4] p-3">
          <button
            onClick={(e) => setIsCropActive(false)}
            className="cursor-pointer transition-all hover:opacity-50"
          >
            <BackSvg width={24} height={25} />
          </button>
        </div>
        <div className="px-3">
          <h4 className="font-medium text-lg text-center text-blue pt-3 border-t border-black/40 border-dotted">
            Select the image you want to crop
          </h4>
          <div className="grid grid-cols-3 gap-3 pb-5">
            {images.map((img, i) => (
              <img
                src={img}
                key={img}
                onClick={(_) => setImageForCrop(i)}
                className="cursor-pointer w-full h-full object-contain border rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        !desktop && "bg-black/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => navigate(-1)}
          className="cursor-pointer transition-all hover:opacity-50"
        >
          <BackSvg width={24} height={25} />
        </button>
        <h3 className="text-blue text-2xl line-clamp-1">
          {name && images.length > 0 ? name : "Solid Scanner"}
        </h3>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="h-[45px] w-[180px]  relative hidden md:block">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`bg-blue outline-none py-3 pl-[20px] pr-[40px] h-full w-full rounded-lg  text-white flex items-center justify-center gap-3 text-[16px] cursor-pointer appearance-none`}
          >
            <option value="none" className="bg-white text-blue hidden ">
              Categories
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-white text-blue "
              >
                {category}
              </option>
            ))}
          </select>
          <div className="absolute top-1/2 -translate-y-1/2 right-[25px] rotate-180">
            <UpChevron height={15} width={15} />
          </div>
        </div>
        <button
          className="cursor-pointer"
          onClick={(e) => setIsCropActive(true)}
        >
          <CropSvg height={35} width={35} />
        </button>
        <label
          id="file-upload"
          className="bg-blue p-2 rounded-full hidden md:block "
        >
          <input
            type="file"
            accept="image/*"
            className="opacity-0 hidden"
            id="file-upload"
            onChange={handleImageUpload}
            multiple={true}
          />
          <AddSvg height={20} width={20} />
        </label>
      </div>
    </div>
  );
}
