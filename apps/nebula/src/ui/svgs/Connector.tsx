import { type SVGProps } from "react";

export default function Connector({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 6.5H18" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M2 10H18" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M2 13.5H18" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M13.5 2V18" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M6.5 2V18" stroke="currentColor" strokeWidth="1.5"></path>
      <path d="M10 2V18" stroke="currentColor" strokeWidth="1.5"></path>
      <path
        d="M13 5H7C5.89543 5 5 5.89543 5 7V13C5 14.1046 5.89543 15 7 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5Z"
        fill="#1C1D21"
      ></path>
      <path
        d="M13 5H7C5.89543 5 5 5.89543 5 7V13C5 14.1046 5.89543 15 7 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
      <path
        d="M12 7.5H8C7.72386 7.5 7.5 7.72386 7.5 8V12C7.5 12.2761 7.72386 12.5 8 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V8C12.5 7.72386 12.2761 7.5 12 7.5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
