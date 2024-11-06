import { useEffect, useState } from "react";
import DeleteCompanySvg from "../../components/svgs/DeleteCompanySvg";
import { deleteUser, getAllStaff, getAllUsers } from "../../utils/userApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Staff() {
  const staff = useSelector((state) => state.user.staff);
  useEffect(() => {
    getAllStaff();
  }, []);
  if (staff.length === 0)
    return (
      <div className="bg-white p-3 mt-5 rounded-md">
        <h3 className="font-semibold mb-1 text-lg border-b border-dotted">
          Mitarbeiter
        </h3>

        <p>Noch keine Mitarbeiter</p>
      </div>
    );
  return (
    <div className="mt-5">
      <h3 className="font-semibold mb-2 text-lg">Mitarbeiter</h3>

      <div className="bg-white border border-[#ddd] rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-8 py-3 gap-4">
          <p>Name</p>
          <p>Löschen</p>
        </div>
        {staff.map((company) => (
          <Company name={company} key={company} />
        ))}
      </div>
    </div>
  );
}

function Company({ name }) {
  const [deleteActive, setDeleteActive] = useState(false);

  function toggleDelete() {
    setDeleteActive(!deleteActive);
  }
  if (deleteActive)
    return (
      <>
        <div
          onClick={toggleDelete}
          className="fixed top-0 left-0 h-full w-full bg-black/50 z-[10000]"
        ></div>
        <div className="bg-blue fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000001] w-[300px] p-3 rounded-md">
          <h2 className="text-white text-center">
            Sind Sie sicher, dass Sie {name} löschen möchten?
          </h2>
          <button
            onClick={() => deleteUser(name)}
            className="w-full outline-none border-none px-3 py-2 rounded-md bg-white mt-2"
          >
            Löschen
          </button>
        </div>
      </>
    );
  return (
    <div className="flex items-center justify-between px-8 py-3 gap-4 border-t border-[#ddd]">
      <p>{name}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleDelete();
        }}
        className="mr-2"
      >
        <DeleteCompanySvg width={16} />
      </button>
    </div>
  );
}
