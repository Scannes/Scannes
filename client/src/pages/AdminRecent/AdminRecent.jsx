import { useState } from "react";
import CompanyDocuments from "./CompanyDocuments";
import DocumentsSearch from "./DocumentsSearch";
import Pagination from "./Pagination";
import RecentDocuments from "./RecentDocuments";
import Companies from "./Companies";
import DocumentFolders from "../../components/documentFolders.jsx/DocumentFolders";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const filesPerPage = import.meta.env.VITE_ADMIN_FILES_PER_PAGE;

export default function AdminRecent() {
  const role = useSelector((state) => state.user?.user?.role);
  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  if (role !== "admin" && user) navigate("/");
  if (!user) navigate("/login");

  const [current, setCurrent] = useState(1);

  // Filter files based on search term
  const files = user?.files || [];
  const filteredFiles = search.trim()
    ? files.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : files;

  // Calculate the files to display on the current page
  const indexOfLastFile = current * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

  if (files?.length === 0)
    return (
      <h3 className="font-semibold mb-2 text-lg text-center h-[80vh] flex items-center justify-center">
        No Documents Yet
      </h3>
    );

  return (
    <div className="max-w-[1500px] block mx-auto p-4 rounded-lg mt-4 bg-[#f4f4f4]">
      <h3 className="font-semibold mb-2 text-lg">Recent Documents</h3>
      <div className="flex md:flex-row flex-col gap-4 md:gap-2 items-end justify-between mb-5">
        <RecentDocuments />
        <div className="md:hidden relative min-w-[270px] max-w-[400px] w-[40%]">
          <DocumentsSearch search={search} setSearch={setSearch} width={true} />
        </div>
      </div>
      <div className="md:flex flex-end justify-end hidden">
        <DocumentsSearch search={search} setSearch={setSearch} width={true} />
      </div>

      <CompanyDocuments filteredFiles={currentFiles} />
      <Pagination
        current={current}
        setCurrent={setCurrent}
        noOfPages={totalPages}
      />

      <Companies />
      <DocumentFolders />
    </div>
  );
}
