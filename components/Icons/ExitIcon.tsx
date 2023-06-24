import React from "react";

interface Props {
  width?: number;
  height?: number;
}

const ExitIcon = ({ width, height }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 18}
      height={height ?? 24}
      stroke="currentColor"
      fill="none"
      viewBox="0 0 18 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 15.438l3-3.938m0 0L9 7.562m3 3.938H1m0 6.563c0 1.223 0 1.834.152 2.317.203.643.593 1.154 1.083 1.42.367.2.833.2 1.765.2h9.8c1.12 0 1.68 0 2.108-.286.376-.252.682-.653.874-1.147C17 20.005 17 19.27 17 17.8V5.2c0-1.47 0-2.205-.218-2.767-.192-.494-.498-.895-.874-1.147C15.48 1 14.92 1 13.8 1H4c-.932 0-1.398 0-1.765.2-.49.266-.88.777-1.083 1.42C1 3.103 1 3.714 1 4.937"
      ></path>
    </svg>
  );
};

export default ExitIcon;
