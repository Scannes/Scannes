import { useEffect, useState } from "react";
import DeleteCompanySvg from "../../components/svgs/DeleteCompanySvg";
import { deleteUser, getAllUsers } from "../../utils/userApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Companies() {
  const role = useSelector((state) => state.user?.user?.role);
  const companies = useSelector((state) => state.user.users);
  const staffCompanies = useSelector((state) => state.user.user?.companies);
  useEffect(() => {
    getAllUsers();
  }, []);
  if (companies.length === 0)
    return (
      <h3 className="font-semibold mb-2 text-lg">Noch keine Unternehmen</h3>
    );
  return (
    <div className="mt-5">
      <h3 className="font-semibold mb-2 text-lg">Unternehmensliste</h3>

      <div className="bg-white border border-[#ddd] rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-8 py-3 gap-4">
          <p>Name</p>
          {role === "admin" && <p>Löschen</p>}
        </div>
        {role === "admin"
          ? companies.map((company) => (
              <Company role={role} name={company} key={company} />
            ))
          : staffCompanies.map((company) => (
              <Company role={role} name={company} key={company} />
            ))}
      </div>
    </div>
  );
}

function Company({ name, role }) {
  const [deleteActive, setDeleteActive] = useState(false);

  function toggleDelete() {
    setDeleteActive(!deleteActive);
  }
  if (deleteActive && role === "admin")
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
    <Link
      to={`/admin/${name.toLowerCase()}`}
      className="flex items-center justify-between px-8 py-3 gap-4 border-t border-[#ddd]"
    >
      <p>{name}</p>
      {role === "admin" && (
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
      )}
    </Link>
  );
}
