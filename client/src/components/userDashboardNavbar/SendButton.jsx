export default function SendButton({ handler, children }) {
  return (
    <button
      onClick={handler}
      className={`bg-blue p-3 h-[50px]  w-[33%] rounded-lg  text-white flex items-center justify-center gap-3 text-xl cursor-pointer`}
    >
      {children}
    </button>
  );
}
