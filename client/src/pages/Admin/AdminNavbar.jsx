import { useState } from "react";
import { logout, signup } from "../../utils/userApi";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function AdminNavbar() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;

    if (!target) return;

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    signup(email, password, name);
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
          className="w-[330px] h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000000001] p-3 rounded-md bg-blue flex flex-col gap-2"
        >
          <input
            required={true}
            type="text"
            id="name"
            placeholder="Enter Client Name"
            className="outline-none border-none p-3 rounded-md"
          />
          <input
            required={true}
            type="email"
            id="email"
            placeholder="Enter Client Email"
            className="outline-none border-none p-3 rounded-md"
          />
          <input
            required={true}
            type="text"
            id="password"
            placeholder="Enter Client Password"
            className="outline-none border-none p-3 rounded-md"
            minLength={7}
          />
          <button className="bg-white/90 p-3 rounded-md">Create</button>
        </form>
      </>
    );
  return (
    <nav className=" bg-[#f4f4f4] sticky top-0 left-0 w-full py-3 z-[69] px-3">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto flex-col gap-5 md:flex-row ">
        <Link to="/admin">
          <img src="/Logo.png" alt="Logo" className="max-w-[140px]" />
        </Link>
        <div className="flex gap-3 flex-wrap md:flex-nowrap">
          <button
            onClick={() => setIsActive(!isActive)}
            className="text-white bg-blue w-full min-w-[180px] rounded-md py-1 px-3 hover:opacity-80"
          >
            Add Client
          </button>
          <button
            onClick={authenticate}
            className="text-white bg-blue w-full min-w-[180px] rounded-md py-1 px-3 hover:opacity-80"
          >
            Authenticate
          </button>
          <button
            onClick={() => logout()}
            className="text-white bg-blue w-full min-w-[100px] rounded-md py-1 px-3 hover:opacity-80"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
