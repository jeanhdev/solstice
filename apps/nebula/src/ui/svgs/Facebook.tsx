import { SVGProps } from "react";

export default function Facebook({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="24.0605"
        cy="24.5"
        r="21"
        fill="url(#paint0_linear_4817_30904)"
      />
      <path
        d="M31.8811 30.9223L32.8139 24.9951H26.9784V21.1505C26.9784 19.5286 27.792 17.9466 30.4058 17.9466H33.0605V12.9005C33.0605 12.9005 30.6523 12.5 28.3509 12.5C23.5428 12.5 20.403 15.3394 20.403 20.4777V24.9951H15.0605V30.9223H20.403V45.2517C21.4756 45.4159 22.5729 45.5 23.6907 45.5C24.8085 45.5 25.9058 45.4159 26.9784 45.2517V30.9223H31.8811Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4817_30904"
          x1="24.0605"
          y1="3.5"
          x2="24.0605"
          y2="45.3754"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18ACFE" />
          <stop offset="1" stopColor="#0163E0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
