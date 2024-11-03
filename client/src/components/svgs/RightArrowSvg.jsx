export default function RightArrowSvg({ height, width, color = "white" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 51 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9L50 9V7L0 7L0 9Z"
        fill={color}
      />
    </svg>
  );
}