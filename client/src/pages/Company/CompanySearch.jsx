import SearchSvg from "../../components/svgs/SearchSvg";

export default function CompanySearch({ search, setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-w-[270px] max-w-[400px] md:w-[40%]"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="text-[14px] py-2 px-4 pr-[35px] w-full rounded-full border border-[#ccc] bg-[#E5E5E5] outline-none"
      />

      <button className="h-[18px] aspect-square absolute top-1/2 right-[15px] -translate-y-1/2">
        <SearchSvg />
      </button>
    </form>
  );
}
