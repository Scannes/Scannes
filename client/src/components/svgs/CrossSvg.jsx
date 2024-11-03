export default function CrossSvg({ height, width, color = "white" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3529 10.1053L2.58202 17.8762M2.58202 2.33435L10.3529 10.1053L2.58202 2.33435ZM10.3529 10.1053L18.1238 17.8762L10.3529 10.1053ZM10.3529 10.1053L18.1238 2.33435L10.3529 10.1053Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
