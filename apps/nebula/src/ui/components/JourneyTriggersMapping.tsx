// import {
//   Pipeline,
//   PipelineStage,
// } from '@hubspot/api-client/lib/codegen/crm/pipelines';
// import clsx from 'clsx';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// import { useAuth } from '@nebula/context/auth';

// import { Card } from '@nebula/ui/components';
// import Combobox from '@nebula/ui/components/Combobox';
// import { OnboardingLayout } from '@nebula/ui/layouts';
// import { Loading } from '@nebula/ui/svgs';

// import { createCrmJourneyTriggers } from '@nebula/api';
// import { Trigger } from '@nebula/schemas';
// import { ConfirmationStages, Crm } from '@nebula/types';

// export default function JourneyTriggersMapping<P, S>({
//   crm,
//   stages,
//   pipelines = undefined,
// }: {
//   crm: Crm;
//   pipelines?: P[];
//   stages: S[];
// }) {
//   const { push } = useRouter();

//   const [mappingStep, setMappingStep] = useState<ConfirmationStages>(
//     ConfirmationStages.UNCONFIRMED,
//   );

//   // TODO: change this with the use of react-hook-form ASAP
//   const [isMappingLoading, setIsMappingLoading] = useState(false);

//   const { profile } = useAuth();

//   const [selectedPipeline, setSelectedPipeline] = useState<P>();

//   const [selectedCustomerTrigger, setSelectedCustomerTrigger] = useState<S>();
//   const [selectedProspectTrigger, setSelectedProspectTrigger] = useState<S>();

//   const isJourneyMappingCompleted = !!(
//     selectedPipeline &&
//     selectedCustomerTrigger &&
//     selectedProspectTrigger
//   );

//   const handleConfirmMapping = async () => {
//     const trigger_prospect: Trigger = {
//       crmKey: crm.key,
//       stageId: selectedProspectTrigger!.id,
//       stageLabel: selectedProspectTrigger!.label,
//       pipelineId: selectedPipeline!.id,
//       pipelineLabel: selectedPipeline!.label,
//     };

//     const trigger_customer: Trigger = {
//       crmKey: crm.key,
//       stageId: selectedCustomerTrigger!.id,
//       stageLabel: selectedCustomerTrigger!.label,
//       pipelineId: selectedPipeline!.id,
//       pipelineLabel: selectedPipeline!.label,
//     };

//     setIsMappingLoading(true);
//     await createCrmJourneyTriggers({
//       crmKey: crm.key,
//       profileId: profile!.id,
//       triggers: { trigger_prospect, trigger_customer },
//     });
//     setIsMappingLoading(false);
//     push({
//       pathname: '/onboarding/connect/paid',
//     });
//   };

//   return (
//     <OnboardingLayout maxW="xl">
//       <Card>
//         <div className="mb-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
//           <h3 className="text-xl font-display-semibold leading-6 text-gray-800">
//             Map your pipeline to Solstice Journey
//           </h3>
//         </div>
//         {mappingStep === ConfirmationStages.UNCONFIRMED ? (
//           <div>
//             <div className="prose prose-sm mb-4">
//               <p>
//                 Congratulation, your {crm?.name} account is now linked to
//                 Solstice.
//               </p>
//               <p>
//                 As explained, when you update a deal stage in your CRM, it will
//                 update the step of the Journey.
//               </p>
//               <p>First, pick the pipeline you want for Solstice.</p>
//             </div>
//             <div className="mb-4">
//               <Combobox<P>
//                 label="Select the pipeline"
//                 entities={pipelines}
//                 selectedEntity={selectedPipeline}
//                 setSelectedEntity={setSelectedPipeline}
//                 attributeToFilterOn="label"
//                 attributeToDisplay="label"
//                 item={({ entity, active, selected }) => (
//                   <div className="flex items-start">
//                     <span className={clsx(selected && 'font-semibold')}>
//                       {entity.label}
//                     </span>
//                   </div>
//                 )}
//               />
//             </div>
//             <div className="mb-4 prose prose-sm">
//               <p>
//                 Second, select triggers for the 'Prospect' and 'Customer'
//                 stages.
//               </p>
//             </div>
//             <div className="mb-4">
//               <Combobox<S>
//                 disabled={!selectedPipeline}
//                 label="Select a trigger for the 'Prospect' step"
//                 entities={data?.pipelines[0].stages}
//                 selectedEntity={selectedProspectTrigger}
//                 setSelectedEntity={setSelectedProspectTrigger}
//                 attributeToFilterOn="label"
//                 attributeToDisplay="label"
//                 item={({ entity, active, selected }) => (
//                   <div className="flex items-start">
//                     <span className={clsx(selected && 'font-semibold')}>
//                       {entity.label}
//                     </span>
//                   </div>
//                 )}
//               />
//             </div>

//             <div className="mb-4">
//               <Combobox<S>
//                 disabled={!selectedPipeline}
//                 label="Select a trigger for the 'Customer' step"
//                 entities={data?.pipelines[0].stages}
//                 selectedEntity={selectedCustomerTrigger}
//                 setSelectedEntity={setSelectedCustomerTrigger}
//                 attributeToFilterOn="label"
//                 attributeToDisplay="label"
//                 item={({ entity, active, selected }) => (
//                   <div className="flex items-start">
//                     <span className={clsx(selected && 'font-semibold')}>
//                       {entity.label}
//                     </span>
//                   </div>
//                 )}
//               />
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setMappingStep(ConfirmationStages.CONFIRMED)}
//                 disabled={!isJourneyMappingCompleted}
//                 type="button"
//                 className={clsx(
//                   'btn-primary',
//                   !isJourneyMappingCompleted && 'btn-disabled',
//                 )}
//               >
//                 Map your journeys
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="prose prose-sm">
//               <p>Please review carefully your choices:</p>
//               <p>
//                 The <span className="text-orange-600">'Prospect'</span> stage is
//                 triggered when deal is at the{' '}
//                 <span className="text-orange-600">
//                   {selectedProspectTrigger?.label}
//                 </span>{' '}
//                 stage in HubSpot.
//               </p>
//               <p>
//                 The <span className="text-orange-600">'Customer'</span> stage is
//                 triggered when a deal is at the{' '}
//                 <span className="text-orange-600">
//                   {selectedCustomerTrigger?.label}
//                 </span>{' '}
//                 stage in HubSpot.
//               </p>
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 disabled={isMappingLoading}
//                 onClick={() => setMappingStep(ConfirmationStages.UNCONFIRMED)}
//                 type="button"
//                 className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm items-center font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 Previous
//               </button>
//               <button
//                 disabled={isMappingLoading}
//                 onClick={handleConfirmMapping}
//                 type="button"
//                 className={clsx('btn-primary')}
//               >
//                 {isMappingLoading ? (
//                   <Loading className="h-4 w-4" />
//                 ) : (
//                   <span>Confirm</span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </Card>
//     </OnboardingLayout>
//   );
// }

export default {};
