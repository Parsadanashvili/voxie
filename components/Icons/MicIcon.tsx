import React from "react";

interface Props {
  width?: number;
  height?: number;
  muted?: boolean;
}

const MicIcon = ({ width, height, muted }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width ?? 24}
      height={height ?? 24}
    >
      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
      {muted && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#FF5A5F"
          strokeWidth={height ? height / 0.3 : 3}
          d="M19 19L17.591 17.591L5.409 5.409L4 4"
        ></path>
      )}
    </svg>
  );
};

export default MicIcon;
