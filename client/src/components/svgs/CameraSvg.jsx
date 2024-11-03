export default function CameraSvg({ width, height, color = "#2F4FCD" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8.5C1 7.70435 1.31607 6.94129 1.87868 6.37868C2.44129 5.81607 3.20435 5.5 4 5.5H5.395C5.88878 5.50007 6.37494 5.37827 6.81035 5.14538C7.24576 4.9125 7.61695 4.57575 7.891 4.165L9.109 2.335C9.38305 1.92425 9.75424 1.5875 10.1897 1.35462C10.6251 1.12173 11.1112 0.999926 11.605 1H17.395C17.8888 0.999926 18.3749 1.12173 18.8103 1.35462C19.2458 1.5875 19.617 1.92425 19.891 2.335L21.109 4.165C21.383 4.57575 21.7542 4.9125 22.1897 5.14538C22.6251 5.37827 23.1112 5.50007 23.605 5.5H25C25.7956 5.5 26.5587 5.81607 27.1213 6.37868C27.6839 6.94129 28 7.70435 28 8.5V22C28 22.7956 27.6839 23.5587 27.1213 24.1213C26.5587 24.6839 25.7956 25 25 25H4C3.20435 25 2.44129 24.6839 1.87868 24.1213C1.31607 23.5587 1 22.7956 1 22V8.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14.5C19 15.6935 18.5259 16.8381 17.682 17.682C16.8381 18.5259 15.6935 19 14.5 19C13.3065 19 12.1619 18.5259 11.318 17.682C10.4741 16.8381 10 15.6935 10 14.5C10 13.3065 10.4741 12.1619 11.318 11.318C12.1619 10.4741 13.3065 10 14.5 10C15.6935 10 16.8381 10.4741 17.682 11.318C18.5259 12.1619 19 13.3065 19 14.5V14.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
