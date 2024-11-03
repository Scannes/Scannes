import UpChevron from "../svgs/UpChevron";
import categories from "../../utils/categories";

export default function CategoriesButton({ children, category, setCategory }) {
  return (
    <div className="h-[50px] w-[65%] relative z-[1] ">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`bg-blue outline-none  p-3 pr-[40px] h-full w-full rounded-lg  text-white flex items-center justify-center gap-3 text-xl cursor-pointer appearance-none`}
      >
        <option value="none" className="bg-white text-blue hidden ">
          {children}
        </option>
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="bg-white text-blue "
          >
            {category}
          </option>
        ))}
      </select>
      <div className="absolute top-1/2 -translate-y-1/2 right-[25px]">
        <UpChevron height={17} width={17} />
      </div>
    </div>
  );
}
