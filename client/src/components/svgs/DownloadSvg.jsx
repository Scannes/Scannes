export default function DownloadSvg({ width, height, color = "#2F4FCD" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20H16V17.6471H0V20ZM16 7.05882H11.4286V0H4.57143V7.05882H0L8 15.2941L16 7.05882Z"
        fill={color}
      />
    </svg>
  );
}
