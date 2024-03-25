import { SVGProps } from "react";

export default function Pipedrive({ ...props }: SVGProps<SVGSVGElement>) {
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
      <path
        d="M17.287 7.60254C15.4193 7.60254 14.3363 8.4501 13.8026 9.01515C13.7398 8.51289 13.4102 7.86936 12.1232 7.86936H9.32935V10.7888H10.4751C10.6635 10.7888 10.7263 10.8515 10.7263 11.0399V24.3969H14.0851V19.4057V19.029C14.6031 19.4998 15.6076 20.1591 17.1458 20.1591C20.3948 20.1591 22.6707 17.585 22.6707 13.8808C22.6707 10.1295 20.5047 7.60254 17.287 7.60254ZM16.6121 17.2554C14.8228 17.2554 14.0067 15.5445 14.0067 13.9436C14.0067 11.4323 15.3722 10.5376 16.6592 10.5376C18.2288 10.5376 19.2961 11.8875 19.2961 13.9122C19.2961 16.2351 17.9463 17.2554 16.6121 17.2554Z"
        fill="#1F3131"
      />
    </svg>
  );
}
