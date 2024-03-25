import { SVGProps } from "react";

export default function Dropdown({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99977 13.009L15.5015 8.05748L14.498 6.94254L9.99977 10.991L5.50149 6.94254L4.49805 8.05748L9.99977 13.009Z"
        fill="currentColor"
      />
    </svg>
  );
}
