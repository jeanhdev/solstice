import { SVGProps } from "react";

export default function Capterra({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="321"
      height="327"
      viewBox="0 0 321 327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.905273 120.38L136.086 120.407L218.285 120.421V38.9871L0.905273 120.38Z"
        fill="#FF9D28"
      />
      <path
        d="M218.285 38.9869V326.49L320.95 0.533936L218.285 38.9869Z"
        fill="#68C5ED"
      />
      <path
        d="M218.285 120.421L136.086 120.407L218.285 326.49V120.421Z"
        fill="#044D80"
      />
      <path
        d="M0.905273 120.38L157.165 173.285L136.086 120.407L0.905273 120.38Z"
        fill="#E54747"
      />
    </svg>
  );
}
