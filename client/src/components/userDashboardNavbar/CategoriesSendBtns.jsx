import { useSelector } from "react-redux";
import CategoriesButton from "./CategoriesButton";
import SendButton from "./SendButton";

import createPdfAndUploadToServer from "../../utils/createPdfAndUploadToServer";
import { useState } from "react";

export default function CategoriesSendBtns() {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("none");
  const images =
    user.croppedImg.length > 0 ? user.croppedImg : user.orignalImage;
  const documentName = user.imageName;

  function handler() {
    createPdfAndUploadToServer(images, documentName, category);
  }

  return (
    <div className="flex items-center gap-4  min-w-full rk">
      <CategoriesButton category={category} setCategory={setCategory}>
        Categories
      </CategoriesButton>
      <SendButton handler={handler}>Send</SendButton>
    </div>
  );
}