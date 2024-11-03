export default function EyeSvg({ width, height, color = "#2F4FCD" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_125_97"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <path
          d="M13 16C19.0753 16 24 9.40005 24 9.40005C24 9.40005 19.0753 2.80005 13 2.80005C6.9247 2.80005 2 9.40005 2 9.40005C2 9.40005 6.9247 16 13 16Z"
          fill="white"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M13 12.1499C13.7293 12.1499 14.4288 11.8602 14.9445 11.3444C15.4603 10.8287 15.75 10.1292 15.75 9.3999C15.75 8.67056 15.4603 7.97108 14.9445 7.45536C14.4288 6.93963 13.7293 6.6499 13 6.6499C12.2707 6.6499 11.5712 6.93963 11.0555 7.45536C10.5397 7.97108 10.25 8.67056 10.25 9.3999C10.25 10.1292 10.5397 10.8287 11.0555 11.3444C11.5712 11.8602 12.2707 12.1499 13 12.1499Z"
          fill="black"
          stroke="black"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_125_97)">
        <path
          d="M-0.200012 -3.7998H26.2V22.6002H-0.200012V-3.7998Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
