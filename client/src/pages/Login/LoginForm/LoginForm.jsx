import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../../utils/userApi";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleForm(e) {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) return;
    login(email.trim(), password);
  }
  function toggleShow() {
    setShow(!show);
  }
  return (
    <form className="relative z-10 w-full max-w-[350px]" onSubmit={handleForm}>
      <h3 className="text-lg mb-2">Anmelde Details</h3>

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value.trim())}
        className="min-w-full px-4 py-2.5 mb-2 rounded-[10px] border-2 border-black/20 font-normal outline-none focus:border-blue"
      />
      <div className="relative h-fit rounded-[10px] overflow-hidden">
        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value.trim())}
          className="min-w-full px-4 py-2.5 pr-16  rounded-[10px] border-2 border-black/20 font-normal outline-none focus:border-blue"
        />
        {password.length > 0 && (
          <button
            className="absolute top-0 right-0 h-full text-white bg-blue px-2"
            type="button"
            onClick={toggleShow}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>

      <button className="mt-4 block mx-auto w-[130px] py-2 bg-blue text-white rounded-md">
        Login
      </button>
    </form>
  );
}
