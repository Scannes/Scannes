import { useState } from "react";
import { logout, signup } from "../../utils/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function AdminNavbar() {
  const userRole = useSelector((state) => state.user?.user?.role);
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;

    if (!target) return;

    const name = target.name.value;
    const email = target?.email?.value;
    const password = target.password.value;
    const company = target.company?.value;
    const clientName = target.clientName?.value;
    if (role === "staff") {
      signup(password, name, role, email);
    }
    signup(password, name, role, null, company, clientName);
    setIsActive(false);
  }

  function authenticate() {
    window.location = `${BACKEND_URL}/auth`;
  }
  if (isActive)
    return (
      <>
        <div
          onClick={() => setIsActive(false)}
          className="active w-full h-full fixed top-0 left-0 bg-black/50 cursor-pointer z-[100000000]"
        ></div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[370px] h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000000001] p-3 rounded-md bg-blue flex flex-col gap-2"
        >
          <input
            required={true}
            type="text"
            id="name"
            placeholder={`Geben Sie den Namen des ${
              role.toLowerCase() === "user" ? "Kunden" : "Mitarbeiters"
            } ein`}
            className="outline-none border-none p-3 rounded-md"
          />
          {role.toLowerCase() != "user" && (
            <input
              required={true}
              type="email"
              id="email"
              placeholder={`Geben Sie die E-Mail-Adresse des ${
                role.toLowerCase() === "user" ? "Kunden" : "Mitarbeiters"
              } ein`}
              className="outline-none border-none p-3 rounded-md"
            />
          )}
          <input
            required={true}
            type="text"
            id="password"
            placeholder={`Geben Sie das Passwort des ${
              role.toLowerCase() === "user" ? "Kunden" : "Mitarbeiters"
            } ein`}
            className="outline-none border-none p-3 rounded-md"
            minLength={7}
          />
          {role.toLowerCase() === "user" && (
            <>
              <input
                required={true}
                type="text"
                id="company"
                placeholder={`Firmenname Eingeben`}
                className="outline-none border-none p-3 rounded-md"
              />
              <input
                required={true}
                type="text"
                id="clientName"
                placeholder={`Kundenname`}
                className="outline-none border-none p-3 rounded-md"
              />
            </>
          )}
          <button className="bg-white/90 p-3 rounded-md">Erstellen</button>
        </form>
      </>
    );
  return (
    <nav className=" bg-[#f4f4f4] sticky top-0 left-0 w-full py-3 z-[69] px-3">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto flex-col gap-5 md:flex-row ">
        <Link to="/admin">
          <img src="/Logo.png" alt="Logo" className="max-w-[140px]" />
        </Link>
        <div className="flex gap-3 flex-wrap flex-end justify-end md:w-[80%] ">
          {userRole === "admin" && (
            <>
              <button
                onClick={() => {
                  setIsActive(!isActive);
                  setRole("staff");
                }}
                className="text-white bg-blue w-full md:max-w-[220px] rounded-md py-1 px-3 hover:opacity-80"
              >
                Mitarbeiter hinzufügen
              </button>
              <button
                onClick={() => {
                  setIsActive(!isActive);
                  setRole("user");
                }}
                className="text-white bg-blue w-full md:max-w-[180px] rounded-md py-1 px-3 hover:opacity-80"
              >
                Kunde hinzufügen
              </button>
            </>
          )}
          <button
            onClick={authenticate}
            className="text-white bg-blue w-full md:max-w-[180px] rounded-md py-1 px-3 hover:opacity-80"
          >
            Authentifizieren
          </button>
          <button
            onClick={() => logout()}
            className="text-white bg-blue w-full md:max-w-[100px] rounded-md py-1 px-3 hover:opacity-80"
          >
            Abmelden
          </button>
        </div>
      </div>
    </nav>
  );
}
