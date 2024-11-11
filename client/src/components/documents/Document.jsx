import { Link } from "react-router-dom";
import DeleteSvg from "../svgs/DeleteSvg";
import DownloadSvg from "../svgs/DownloadSvg";
import EyeSvg from "../svgs/EyeSvg";
import RenameSvg from "../svgs/RenameSvg";
import UploadSvg from "../svgs/UploadSvg";
import { deleteFile, renameFile, uploadToOneDrive } from "../../utils/userApi";
import { useSelector } from "react-redux";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Function to format the date
function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function Document({
  name,
  date,
  category = "",
  company = "",
  src,
  file,
  isUploaded,
}) {
  const role = useSelector((state) => state.user?.user?.role);
  const dateOfUpload = new Date(date);
  const uploadDateStr = formatDate(dateOfUpload);
  const [isRenameActive, setIsRenameActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  function toggleIsRenameActive() {
    setIsRenameActive(!isRenameActive);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;

    renameFile(file, name);
    toggleIsRenameActive();
  }
  function upload() {
    console.log(company, category, file);
    uploadToOneDrive(file, company, category);
  }
  function toggleDelete() {
    setDeleteActive(!deleteActive);
  }
  function deleteIt() {
    deleteFile(file);
    toggleDelete();
  }
  if (deleteActive)
    return (
      <>
        <div
          onClick={toggleDelete}
          className="fixed top-0 left-0 h-full w-full bg-black/50 z-[10000]"
        ></div>
        <div className="bg-blue fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000001] w-full max-w-[350px] p-3 rounded-md">
          <h2 className="text-white text-center">
            Sind Sie sicher, dass Sie {file} löschen möchten?
          </h2>
          <button
            onClick={deleteIt}
            className="w-full outline-none border-none px-3 py-2 rounded-md bg-white mt-2"
          >
            Löschen
          </button>
        </div>
      </>
    );
  if (isRenameActive)
    return (
      <>
        <div
          onClick={toggleIsRenameActive}
          className="fixed top-0 left-0 h-full w-full bg-black/50 z-[10000]"
        ></div>
        <form
          onSubmit={handleSubmit}
          className="bg-blue fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000001] w-[300px] p-3 rounded-md"
        >
          <input
            type="text"
            className="w-full outline-none border-none px-3 py-2 rounded-md"
            placeholder="Neuer Dateiname.."
            id="name"
          />
          <button className="w-full outline-none border-none px-3 py-2 rounded-md bg-white mt-2">
            Namen ändern
          </button>
        </form>
      </>
    );
  if (!name)
    return (
      <div
        className="grid gap-2 py-2"
        style={{
          gridTemplateColumns: "1fr 440px",
        }}
      >
        <div className=" grid grid-cols-4 gap-5 px-3 items-center">
          <p className="text-center text-[14px] font-bold">Name</p>
          <p className="text-center text-[14px] font-bold">Datum</p>
          <p className="text-center text-[14px] font-bold">Kategorie</p>
          <p className="text-center text-[14px] font-bold">Unternehmen</p>
        </div>

        <div
          className="grid gap-2 items-center"
          style={{
            gridTemplateColumns: `repeat(${
              role?.toLowerCase() === "admin" ? 5 : 4
            },${role?.toLowerCase() === "admin" ? "80px" : "100px"})`,
          }}
        >
          <p className="text-center text-[12px] font-bold">Vorschau</p>
          <p className="text-center text-[12px] font-bold">Hochladen</p>
          <p className="text-center text-[12px] font-bold">Herunterladen</p>
          <p className="text-center text-[12px] font-bold">Umbenennen</p>
          {role?.toLowerCase() === "admin" && (
            <p className="text-center text-[12px] font-bold">Löschen</p>
          )}
        </div>
      </div>
    );
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: "1fr 440px",
      }}
    >
      <div className="bg-[#f4f4f4] rounded-lg grid grid-cols-4 gap-5 p-3 items-center">
        <div className="flex items-center pl-5 gap-2">
          <img
            src={`${BACKEND_URL}/img/${src}`}
            className="w-[45px] object-cover"
          />
          <p className="line-clamp-1">{name}</p>
        </div>
        <p className="text-center">{uploadDateStr}</p>
        <p className="text-center capitalize">{category.toLowerCase()}</p>
        <p className="text-center ">{company}</p>
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(5,80px)`,
        }}
      >
        <Link
          to={`${BACKEND_URL}/file/${file}`}
          target="_blank"
          className="bg-[#ECECEC] h-full w-full aspect-square rounded-lg text-blue text-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:bg-black/10"
        >
          <EyeSvg width={26} />
          Vorschau
        </Link>
        <button
          onClick={upload}
          className={`${
            isUploaded ? "bg-green-300" : "bg-[#ECECEC]"
          } h-full w-full aspect-square rounded-lg text-blue text-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:bg-black/10`}
        >
          <UploadSvg width={18} />
          Hochladen
        </button>
        <a
          href={`${BACKEND_URL}/file/download/${file}`}
          download
          className="bg-[#ECECEC] h-full w-full aspect-square rounded-lg text-blue text-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:bg-black/10"
        >
          <DownloadSvg width={18} />
          Herunterladen
        </a>
        <button
          onClick={toggleIsRenameActive}
          className="bg-[#D7D7D7] h-full w-full aspect-square rounded-lg text-blue text-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:bg-black/10"
        >
          <RenameSvg width={24} />
          Umbenennen
        </button>

        <button
          onClick={toggleDelete}
          className="bg-[#FFA5A5] h-full w-full aspect-square rounded-lg text-black text-[10px] flex flex-col items-center justify-center gap-1 transition-all hover:bg-black/10"
        >
          <DeleteSvg width={24} />
          Löschen
        </button>
      </div>
    </div>
  );
}
