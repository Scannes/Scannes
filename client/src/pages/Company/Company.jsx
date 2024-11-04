import { useSelector } from "react-redux";
import DocumentFolders from "../../components/documentFolders.jsx/DocumentFolders";
import Document from "../../components/documents/Document";
import CompanySearch from "./CompanySearch";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFiles } from "../../utils/userApi";
import Pagination from "../AdminRecent/Pagination";

const filesPerPage = import.meta.env.VITE_ADMIN_FILES_PER_PAGE;
export default function Company() {
  const role = useSelector((state) => state.user?.user?.role);
  const user = useSelector((state) => state.user.user);

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { company } = useParams();

  if (role !== "admin" && role !== "staff" && user) navigate("/");
  if (!user) navigate("/login");

  const [current, setCurrent] = useState(1);

  // Filter files based on search term
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

  useEffect(() => {
    getUserFiles(company, setFiles);
  }, [company]);
  return (
    <div>
      <div className="max-w-[1500px] block mx-auto p-4 rounded-lg mt-4 bg-[#f4f4f4]">
        <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2 md:gap-5 mb-5">
          <h3 className="font-semibold mb-2 text-lg">Alle Dokumente</h3>
          <CompanySearch setSearch={setSearch} search={search} />
        </div>
        <div className="bg-white rounded-md py-3 px-5 border border-[#ddd] overflow-scroll lg:overflow-hidden ">
          <div className="flex flex-col gap-2 min-w-[1200px]">
            <Document />
            {currentFiles.length === 0 && (
              <h3 className="text-center mt-3 border-t pt-3">No File </h3>
            )}
            {currentFiles.map((file) => (
              <Document
                key={file.img}
                name={file.name}
                date={file.date}
                file={file.path}
                category={file.category}
                src={file.img}
                company={file.company}
              />
            ))}
          </div>
        </div>
        {totalPages >= 1 && (
          <Pagination
            current={current}
            setCurrent={setCurrent}
            noOfPages={totalPages}
          />
        )}

        <DocumentFolders company={company} />
      </div>
    </div>
  );
}
