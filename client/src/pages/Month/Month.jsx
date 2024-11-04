import { useNavigate, useParams } from "react-router-dom";
import categories from "../../utils/categories";
import { useEffect, useState } from "react";
import { getFilesByMonthAndCategory } from "../../utils/userApi";
import Documents from "../../components/documents/Documents";
import Pagination from "../AdminRecent/Pagination";

const filesPerPage = import.meta.env.VITE_ADMIN_FILES_PER_PAGE;

export default function Month() {
  const { month, company } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);

  const filteredFiles = search.trim()
    ? data.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : data;

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const index = months.indexOf(month.toLowerCase());

  const [year, setYear] = useState(new Date().getFullYear());
  // Generate an array from 2024 to the current year
  const years = Array.from(
    { length: new Date().getFullYear() - 2024 + 1 },
    (_, i) => 2024 + i
  );

  // Calculate the files to display on the current page
  const indexOfLastFile = current * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    if (category) {
      getFilesByMonthAndCategory(
        `${year}-${index + 1}`,
        category,
        setData,
        setFetching,
        setFetched,
        setSearch,
        company
      );
    }
  }, [category, year, index, company]);
  if (index < 0) navigate("/admin");

  return (
    <div className="max-w-[1400px] block mx-auto p-5">
      <div className=" flex  items-center justify-between flex-wrap gap-3 mb-4 text-xl bg-[#f4f4f4] px-5 py-3 rounded-md shadow-md">
        <h3 className="font-semibold">
          {" "}
          {month?.at(0).toUpperCase()}
          {month.slice(1).toLowerCase()}
        </h3>
        <select
          value={year}
          onChange={handleYearChange}
          className="px-5 py-2 bg-blue text-white rounded-md outline-none border-none text-[18px] cursor-pointer"
        >
          {years.map((year) => (
            <option className="bg-[#f4f4f4] text-blue" key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex  gap-2 items-center justify-center flex-wrap bg-[#f4f4f4] px-3 py-5 rounded-md shadow-md">
          {categories.map((cat) => (
            <button
              onClick={() => {
                if (year === "" || !year) return;
                setCategory(cat.toLowerCase());
                setFetching(true);
                setFetched(false);
              }}
              className="bg-blue hover:bg-black/70 px-5 py-2 w-[200px] text-white rounded-md "
              key={cat}
            >
              {fetching && cat.toLowerCase() === category.toLowerCase()
                ? "Laden.."
                : cat}
            </button>
          ))}
        </div>

        {fetched && data.length === 0 && (
          <h3 className=" mt-4 text-center font-semibold mb-4 text-xl bg-[#f4f4f4] px-3 py-3 rounded-md shadow-md">
            No Files Found
          </h3>
        )}

        {fetched && data.length > 0 && (
          <>
            <input
              type="text"
              className="block ml-auto p-3 px-5 bg-[#f4f4f4] text-[#222] outline-none rounded-full w-full max-w-[400px] text-[17px] mt-7 mb-3"
              placeholder="Suche"
              onChange={(e) => setSearch(e.target.value.trim())}
            />
            <Documents filteredFiles={currentFiles} />

            {fetched && filteredFiles.length > 0 && (
              <Pagination
                current={current}
                setCurrent={setCurrent}
                noOfPages={totalPages}
              />
            )}

            {fetched && filteredFiles.length === 0 && (
              <h3 className=" mt-4 text-center font-semibold mb-4 text-xl bg-[#f4f4f4] px-3 py-3 rounded-md shadow-md">
                Keine Dateien gefunden
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
}
