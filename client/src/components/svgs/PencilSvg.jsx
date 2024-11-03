export default function PencilSvg({ width, height, color = "white" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2318 3.22783L16.7677 6.75671L13.2318 3.22783ZM14.7317 1.73085C15.2006 1.2629 15.8366 1 16.4997 1C17.1628 1 17.7988 1.2629 18.2677 1.73085C18.7366 2.19881 19 2.8335 19 3.49529C19 4.15709 18.7366 4.79177 18.2677 5.25973L4.49994 19H1V15.4352L14.7317 1.73085V1.73085Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
