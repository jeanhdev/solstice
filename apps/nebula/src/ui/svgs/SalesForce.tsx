import { SVGProps } from "react";

export default function SalesForce({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" fill="white" />
      <mask
        id="mask0_4868_406695"
        style={{ maskType: "luminance" }}
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="5"
        y="8"
        width="22"
        height="16"
      >
        <path
          d="M5.052 8.35254H26.9479V23.6475H5.052V8.35254Z"
          fill="#00A1E0"
        />
      </mask>
      <g mask="url(#mask0_4868_406695)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.1429 10.0335C14.8496 9.29772 15.8333 8.84209 16.9201 8.84209C18.3691 8.84209 19.6249 9.64709 20.3011 10.8465C20.9013 10.5782 21.5514 10.4397 22.2089 10.44C24.8171 10.44 26.9342 12.5733 26.9342 15.2056C26.9342 17.838 24.8171 19.9712 22.2089 19.9712C21.8901 19.9712 21.5794 19.9392 21.2751 19.8786C20.6834 20.9332 19.5524 21.6496 18.2644 21.6496C17.74 21.6507 17.2224 21.5317 16.751 21.3019C16.1513 22.7106 14.7547 23.7008 13.1286 23.7008C11.43 23.7008 9.98908 22.6301 9.43364 21.1248C9.18642 21.1769 8.93444 21.2032 8.68177 21.203C6.66124 21.203 5.0271 19.5447 5.0271 17.5081C5.0271 16.1396 5.76286 14.9482 6.85444 14.3042C6.62286 13.7707 6.50366 13.1952 6.50426 12.6137C6.50426 10.2631 8.4121 8.36328 10.7627 8.36328C12.1392 8.36328 13.3709 9.01936 14.1437 10.0377"
          fill="#00A1E0"
        />
      </g>
    </svg>
  );
}
