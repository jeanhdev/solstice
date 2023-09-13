import { SVGProps } from "react";

export default function Bing({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <g clipPath="url(#clip0_4705_410988)">
        <path
          d="M13.1164 9.25843L15.9703 15.4419L20.18 17.3408L4.98528 25.3333L11.2137 19.7903V3.96629L4.80176 2V25.5356L11.1763 30L27.1988 20.4494V13.5693L13.1164 9.25843Z"
          fill="#00897B"
        />
      </g>
      <defs>
        <clipPath id="clip0_4705_410988">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
