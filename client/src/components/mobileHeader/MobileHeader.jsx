import { Link } from "react-router-dom";

export default function MobileHeader() {
  return (
    <Link
      to="/"
      className="w-full flex items-center justify-center py-5 relative"
    >
      <img src="/Logo.png" className="h-[90px] object-cover" />
    </Link>
  );
}
