import { type SVGProps } from "react";

export default function XMark({ ...props }: SVGProps<SVGSVGElement>) {
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
        d="M9.99902 8.93945L13.4688 5.46973L14.5294 6.53039L11.0597 10.0001L14.5294 13.4698L13.4688 14.5305L9.99902 11.0608L6.52941 14.5304L5.46875 13.4697L8.93836 10.0001L5.46875 6.5305L6.52941 5.46984L9.99902 8.93945Z"
        fill="currentColor"
      />
    </svg>
  );
}
