import { useDispatch, useSelector } from "react-redux";
import CategoriesButton from "./CategoriesButton";
import SendButton from "./SendButton";

import createPdfAndUploadToServer from "../../utils/createPdfAndUploadToServer";
import { useState } from "react";

export default function CategoriesSendBtns() {
  const user = useSelector((state) => state.user);
  const [isSending, setIsSending] = useState(false);
  const [category, setCategory] = useState("none");
  const images =
    user.croppedImg.length > 0 ? user.croppedImg : user.orignalImage;
  const documentName = user.imageName;
  const dispatch = useDispatch();

  function handler() {
    setIsSending(true);
    createPdfAndUploadToServer(
      images,
      documentName,
      category,
      dispatch,
      setIsSending
    );
  }

  return (
    <div className="flex items-center gap-4  min-w-full rk">
      <CategoriesButton category={category} setCategory={setCategory}>
        Categories
      </CategoriesButton>
      <SendButton handler={handler}>
        {isSending ? "Sending..." : "Send"}
      </SendButton>
    </div>
  );
}
