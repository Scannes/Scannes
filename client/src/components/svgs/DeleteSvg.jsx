export default function DeleteSvg({
  width,
  height,
  color = "#313131",
  no = 1,
}) {
  if (no === 2)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 6.33333H23M21.625 6.33333L20.4329 22.5227C20.3835 23.1954 20.073 23.8251 19.564 24.2848C19.055 24.7444 18.3853 25 17.6898 25H6.31025C5.61469 25 4.94497 24.7444 4.43597 24.2848C3.92697 23.8251 3.61651 23.1954 3.56713 22.5227L2.375 6.33333H21.625ZM9.25 11.6667V19.6667V11.6667ZM14.75 11.6667V19.6667V11.6667ZM16.125 6.33333V2.33333C16.125 1.97971 15.9801 1.64057 15.7223 1.39052C15.4644 1.14048 15.1147 1 14.75 1H9.25C8.88533 1 8.53559 1.14048 8.27773 1.39052C8.01987 1.64057 7.875 1.97971 7.875 2.33333V6.33333H16.125Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5188 6.71572H19.6792M18.7317 6.71572L17.9102 17.2618C17.8762 17.7001 17.6622 18.1103 17.3115 18.4097C16.9607 18.7092 16.4992 18.8756 16.0199 18.8756H8.17815C7.69883 18.8756 7.23731 18.7092 6.88656 18.4097C6.5358 18.1103 6.32186 17.7001 6.28783 17.2618L5.46633 6.71572H18.7317ZM10.204 10.19V15.4014V10.19ZM13.9941 10.19V15.4014V10.19ZM14.9416 6.71572V4.11002C14.9416 3.87966 14.8418 3.65874 14.6641 3.49585C14.4864 3.33296 14.2454 3.24146 13.9941 3.24146H10.204C9.95266 3.24146 9.71165 3.33296 9.53395 3.49585C9.35626 3.65874 9.25643 3.87966 9.25643 4.11002V6.71572H14.9416Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
