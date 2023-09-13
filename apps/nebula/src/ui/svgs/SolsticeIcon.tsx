import { SVGProps } from "react";

export default function SolsticeIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="38"
      height="38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#a)">
        <g clipPath="url(#b)">
          <rect x={3} y={2} width={32} height={32} rx={8} fill="#fff" />
          <rect x={3} y={2} width={32} height={32} rx={8} fill="url(#c)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 4.039c-7.71 0-13.961 6.25-13.961 13.96 0 7.711 6.25 13.962 13.961 13.962 7.71 0 13.961-6.25 13.961-13.961 0-7.71-6.25-13.961-13.961-13.961ZM4.961 17.999c0-7.753 6.286-14.038 14.039-14.038S33.039 10.246 33.039 18c0 7.753-6.286 14.038-14.039 14.038S4.961 25.753 4.961 18Z"
            fill="#D0D5DD"
          />
          <g filter="url(#d)">
            <path
              d="M30.26 18c0 6.219-5.042 11.26-11.26 11.26S7.74 24.219 7.74 18c0-6.218 5.042-11.259 11.26-11.259s11.26 5.04 11.26 11.26Z"
              fill="url(#e)"
            />
            <path
              d="M30.26 18c0 6.219-5.042 11.26-11.26 11.26S7.74 24.219 7.74 18c0-6.218 5.042-11.259 11.26-11.259s11.26 5.04 11.26 11.26Z"
              fill="#000"
              fillOpacity={0.03}
            />
          </g>
        </g>
        <rect
          x={3.1}
          y={2.1}
          width={31.8}
          height={31.8}
          rx={7.9}
          stroke="#D0D5DD"
          strokeWidth={0.2}
        />
      </g>
      <g filter="url(#f)">
        <path
          d="M3 18h32v3.2c0 4.48 0 6.72-.872 8.432a8 8 0 0 1-3.496 3.496C28.92 34 26.68 34 22.2 34h-6.4c-4.48 0-6.72 0-8.432-.872a8 8 0 0 1-3.496-3.496C3 27.92 3 25.68 3 21.2V18Z"
          fill="#fff"
          fillOpacity={0.2}
        />
      </g>
      <defs>
        <filter
          id="a"
          x={0}
          y={0}
          width={38}
          height={38}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4662_518272"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_dropShadow_4662_518272"
            result="effect2_dropShadow_4662_518272"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_4662_518272"
            result="shape"
          />
        </filter>
        <filter
          id="d"
          x={4.741}
          y={4.741}
          width={28.519}
          height={28.519}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4662_518272"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_dropShadow_4662_518272"
            result="effect2_dropShadow_4662_518272"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_4662_518272"
            result="shape"
          />
        </filter>
        <filter
          id="f"
          x={-2}
          y={13}
          width={42}
          height={26}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={2.5} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_4662_518272"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_4662_518272"
            result="shape"
          />
        </filter>
        <linearGradient
          id="c"
          x1={19}
          y1={2}
          x2={19}
          y2={34}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#D0D5DD" />
        </linearGradient>
        <linearGradient
          id="e"
          x1={12.179}
          y1={26.535}
          x2={30.259}
          y2={18}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C83100" />
          <stop offset={1} stopColor="#FF835B" />
        </linearGradient>
        <clipPath id="b">
          <rect x={3} y={2} width={32} height={32} rx={8} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
