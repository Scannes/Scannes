export default function UploadSvg({ width, height, color = "#2F4FCD" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 21H18V18.5294H0V21ZM0 8.64706H5.14286V16.0588H12.8571V8.64706H18L9 0L0 8.64706Z"
        fill={color}
      />
    </svg>
  );
}
