import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div className="min-h-[90vh] flex flex-col gap-3 items-center justify-center">
      <h3 className="text-red-500 text-3xl">
        {error.status} {error.statusText}
      </h3>
      <Link to="/">Go Back</Link>
    </div>
  );
}
