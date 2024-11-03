import { useSelector } from "react-redux";
import Gradient from "./Gradient/Gradient";
import LoginForm from "./LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  if (user && user.role === "admin") navigate("/admin");
  if (user && user.role !== "admin") navigate("/");
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-around py-[40px] md:flex-row md:min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <img src="/Logo.png" alt="Logo" className="md:w-[250px]" />
        <p className="text-purple -translate-y-[8px]">SCANNER</p>
      </div>
      <LoginForm />

      <Gradient />
    </div>
  );
}
