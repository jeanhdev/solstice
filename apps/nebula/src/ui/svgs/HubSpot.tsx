import { SVGProps } from "react";

export default function HubSpot({ ...props }: SVGProps<SVGSVGElement>) {
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
        d="M20.8206 12.7829V10.5389C21.1172 10.4003 21.3682 10.1803 21.5446 9.90458C21.721 9.62884 21.8155 9.30866 21.817 8.98133V8.92984C21.817 7.97545 21.0433 7.20176 20.089 7.20176H20.0374C19.083 7.20176 18.3093 7.97545 18.3093 8.92984V8.98133C18.3108 9.30866 18.4053 9.62884 18.5817 9.90458C18.7581 10.1803 19.0092 10.4003 19.3057 10.5389V12.7829C18.4534 12.9134 17.6507 13.2669 16.9789 13.8074L10.8246 9.01373C10.8684 8.85531 10.8913 8.6924 10.8939 8.52889C10.8947 8.14376 10.7812 7.76706 10.5678 7.44644C10.3545 7.12582 10.0508 6.87568 9.69525 6.72766C9.3397 6.57965 8.94824 6.5404 8.57038 6.61489C8.19253 6.68938 7.84525 6.87426 7.57249 7.14615C7.29972 7.41803 7.11371 7.76471 7.038 8.14232C6.96228 8.51993 7.00026 8.91151 7.14712 9.26754C7.29399 9.62356 7.54314 9.92804 7.86307 10.1424C8.18299 10.3568 8.55932 10.4716 8.94445 10.472C9.28137 10.4705 9.61197 10.3805 9.90325 10.2112L15.9636 14.927C14.8494 16.6102 14.8792 18.8038 16.0386 20.4561L14.1954 22.2998C14.0463 22.2522 13.8912 22.2269 13.7347 22.2248C12.852 22.2255 12.1369 22.9414 12.1371 23.8242C12.1373 24.7069 12.8529 25.4224 13.7356 25.4226C14.6183 25.4228 15.3342 24.7077 15.335 23.8249C15.3329 23.6685 15.3076 23.5133 15.2598 23.3644L17.0833 21.5402C18.7126 22.7945 20.9503 22.9026 22.6929 21.8111C24.4354 20.7196 25.3148 18.659 24.8973 16.6457C24.4798 14.6324 22.8535 13.0916 20.8206 12.7829ZM20.0648 20.1634C19.7279 20.1724 19.3927 20.1139 19.0788 19.9912C18.7649 19.8686 18.4788 19.6843 18.2373 19.4492C17.9958 19.2142 17.8039 18.9331 17.6728 18.6226C17.5418 18.3122 17.4743 17.9786 17.4743 17.6416C17.4743 17.3046 17.5418 16.971 17.6728 16.6605C17.8039 16.3501 17.9958 16.069 18.2373 15.8339C18.4788 15.5989 18.7649 15.4146 19.0788 15.2919C19.3927 15.1693 19.7279 15.1107 20.0648 15.1198C21.4224 15.1673 22.4985 16.2813 22.4993 17.6398C22.4999 18.9981 21.4249 20.1132 20.0673 20.1621"
        fill="#FF7A59"
      />
    </svg>
  );
}