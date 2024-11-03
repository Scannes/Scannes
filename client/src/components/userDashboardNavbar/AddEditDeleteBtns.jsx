import { useDispatch, useSelector } from "react-redux";
import AddSvg from "../svgs/AddSvg";
import DeleteSvg from "../svgs/DeleteSvg";
import PencilSvg from "../svgs/PencilSvg";
import { useState } from "react";
import {
  deleteImages,
  setCropped,
  setImage,
  setImageName,
} from "../../slices/userSlice";
import ScanType from "../scanComponent/ScanType";

export default function AddEditDeleteBtns() {
  const dispatch = useDispatch();
  const documentName = useSelector((state) => state.user.imageName);

  const [isNameChangeActive, setIsNameChangeActive] = useState(false);
  const [name, setName] = useState("");

  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  function handleNameChange() {
    if (name.trim() !== "") {
      dispatch(setImageName(name));
    }
    setIsNameChangeActive(false);
  }

  function toggleNameChangeActive() {
    setIsNameChangeActive(!isNameChangeActive);
  }

  function deleteImage() {
    dispatch(deleteImages());
  }

  function toggleDeleteActive() {
    setIsDeleteActive(!isDeleteActive);
  }

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

  if (isNameChangeActive)
    return (
      <div className="mb-3 pt-2.5 flex flex-col items-end justify-end gap-4">
        <input
          type="text"
          placeholder="Enter new name..."
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNameChange()}
          className="w-full bg-transparent outline-none border-b text-white px-2 placeholder:text-white/50"
        />
        <button
          onClick={handleNameChange}
          className={`curosor-pointer bg-blue p-3   h-[40px] px-[30px]  rounded-lg  text-white flex items-center justify-center gap-3 text-lg cursor-pointer`}
        >
          Save
        </button>
      </div>
    );
  if (isDeleteActive)
    return (
      <div className="mb-3 pt-2.5 flex flex-col  gap-4">
        <p className="text-white">
          Are you sure you want to delete{" "}
          <span className="font-bold">{`"${documentName}"`}</span>
        </p>

        <button
          onClick={deleteImage}
          className={`curosor-pointer bg-red-600 p-3   h-[40px] px-[30px]  rounded-lg  text-white flex items-center justify-center gap-3 text-lg cursor-pointer`}
        >
          Delete
        </button>
      </div>
    );
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div>
        <Button handler={() => setIsOpen(true)}>
          <AddSvg height={25} />
        </Button>
        {isOpen && (
          <ScanType desktop={true} setIsOpen={setIsOpen} isOpen={isOpen} />
        )}
      </div>
      <div className="flex items-center gap-3 rk">
        <Button handler={toggleDeleteActive}>
          {/* <BinSvg height={25} color="white" /> */}
          <DeleteSvg height={22} color="white" no={2} />
        </Button>
        <Button handler={toggleNameChangeActive}>
          <PencilSvg height={18} />
        </Button>
      </div>
    </div>
  );
}

// <div className="flex items-center justify-center gap-3 mb-3">
// <Button>
//   <label
//     htmlFor="file-upload"
//     className="cursor-pointer absolute top-0 left-0 w-full h-full"
//   ></label>
//   <AddSvg height={25} />
//   <input
//     type="file"
//     accept="image/*"
//     className="opacity-0 hidden"
//     id="file-upload"
//     onChange={handleImageUpload}
//     multiple={true}
//   />
// </Button>
// <Button handler={toggleDeleteActive}>
//   {/* <BinSvg height={25} color="white" /> */}
//   <DeleteSvg height={22} color="white" no={2} />
// </Button>
// <Button handler={toggleNameChangeActive}>
//   <PencilSvg height={18} />
// </Button>
// </div>
function Button({ children, handler }) {
  return (
    <button
      onClick={handler || (() => {})}
      className={`curosor-pointer relative bg-blue p-3  aspect-square h-[50px]  rounded-full  text-white flex items-center justify-center gap-3 text-xl cursor-pointer`}
    >
      {children}
    </button>
  );
}
