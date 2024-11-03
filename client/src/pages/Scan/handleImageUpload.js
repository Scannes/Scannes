import { setCropped, setImage, setImageName } from "../../slices/userSlice";

import store from "../../store";
const dispatch = store.dispatch;

function padStart(number) {
  return number.toString().padStart(2, "0");
}
function setDocumentName() {
  const date = new Date();
  const documentName = `Scan ${padStart(date.getDate())}_${padStart(
    date.getMonth()
  )}_${padStart(date.getFullYear())} ${padStart(date.getHours())}_${padStart(
    date.getMinutes()
  )}_${padStart(date.getSeconds())}`;

  dispatch(setImageName(documentName));
}

export default function handleImageUpload(e) {
  e.preventDefault();
  const target = e.target;
  if (!target) return;
  const files = target?.files;

  if (files.length === 0) return;
  const urls = Object.values(files).map((file) => URL.createObjectURL(file));

  urls.forEach((url) => {
    dispatch(setImage(url));

    dispatch(setCropped(url));
  });
  // closeModal();
  setDocumentName();
}
