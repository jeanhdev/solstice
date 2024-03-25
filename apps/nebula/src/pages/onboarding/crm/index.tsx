// import Link from "next/link";
// import { Integration } from "@solstice/cosmos/tables/integrations";
// import { useState } from "react";

// import { getCrmOAuthUrls } from "@nebula/lib/client/oauth";
// import { Button } from "@nebula/ui/components";
// import { OnboardingLayout } from "@nebula/ui/layouts";
// import LoadingLayout from "@nebula/ui/layouts/LoadingLayout";
// import { api } from "@nebula/utils/api";

// export default function CrmPage() {
//   const [isEducated, setIsEducated] = useState<boolean>(false);

//   const handleCrmEducated = () => {
//     setIsEducated(true);
//   };

//   const { data, isLoading } = api.integration.getCrms.useQuery();

//   if (isLoading) return <LoadingLayout />;

//   if (isEducated) {
//     return <EducatedCrmConnectPage crms={data} />;
//   }

//   return (
//     <OnboardingLayout
//       title={<>Connect your CRM</>}
//       subtitle={<>Why do I need to connect my CRM ?</>}
//       description={
//         <div className="flex flex-col gap-4">
//           <span>
//             Part of achieving reliable revenue attribution, is to fit your CRM
//             setup. After hundreds of interview, we found that part of the
//             reliability issue with attribution is found in the CRM:{" "}
//           </span>

//           <ul className="space-y-2 list-decimal list-inside">
//             <li>
//               <span className="underline">General CRM setup</span>
//               <span>
//                 : how many pipelines you have ? how do you categorize leads or
//                 prospects ? Instead of guessing, we prefer letting you set it up
//                 so that Solstice communicates perfectly with your CRM.{" "}
//               </span>{" "}
//             </li>
//             <li>
//               <span className="underline">
//                 No clear guidelines of updating the CRM
//               </span>
//               <span>
//                 : it's hard to guess how you update your CRM, for Solstice to
//                 work perfectly with your company, we need you to respect{" "}
//                 <Link href="/guide/crm-process" className="link">
//                   a simple process
//                 </Link>
//                 .
//               </span>
//             </li>
//           </ul>
//         </div>
//       }
//     >
//       <div className="flex justify-end">
//         <Button
//           onClick={handleCrmEducated}
//           type="button"
//           label={<>Continue</>}
//         />
//       </div>
//     </OnboardingLayout>
//   );
// }

// function EducatedCrmConnectPage({ crms }: { crms: Integration[] | undefined }) {
//   if (!crms) return null;

//   const handleConnectToHubspot = () => {
//     const { oauthUrls } = getCrmOAuthUrls();

//     const crmOauthUrl = oauthUrls["HUBSPOT"];

//     window.location.href = crmOauthUrl;
//   };

//   return (
//     <OnboardingLayout
//       fullWidth
//       title={<>Connect your CRM</>}
//       subtitle={<>Supported integrations</>}
//       description={
//         <>
//           <span>
//             In terms of support, we are currently exclusive to{" "}
//             <span className="label-default-strong">HubSpot</span>.
//           </span>
//           <span>
//             We appreciate your patience, and will implement other CRMs such as
//             SalesForce or Pipedrive in the near future.
//           </span>
//         </>
//       }
//     >
//       <div className="flex justify-end">
//         <Button
//           onClick={handleConnectToHubspot}
//           label={<>Continue to HubSpot</>}
//         />
//       </div>
//     </OnboardingLayout>
//   );
// }
