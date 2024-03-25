import { SVGProps } from "react";

export default function SolsticeLogo({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="37"
      height="29"
      viewBox="0 0 37 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 11.5C30 17.8513 24.8513 23 18.5 23C12.1487 23 7 17.8513 7 11.5C7 5.14873 12.1487 0 18.5 0C24.8513 0 30 5.14873 30 11.5Z"
        fill="#FF6300"
      />
      <g filter="url(#filter0_b_4892_407011)">
        <path d="M0 12H37V29H0V12Z" fill="#15181E" fillOpacity="0.2" />
      </g>
      <defs>
        <filter
          id="filter0_b_4892_407011"
          x="-5"
          y="7"
          width="47"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_4892_407011"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_4892_407011"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
