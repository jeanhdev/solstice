import { useRouter } from "next/router";
import {
  Pipeline,
  PipelineStage,
} from "@hubspot/api-client/lib/codegen/crm/pipelines";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { Button, ButtonTertiary, LoadingCard } from "@nebula/ui/components";
import Combobox from "@nebula/ui/components/Combobox";
import { OnboardingLayout } from "@nebula/ui/layouts";
import { Loading } from "@nebula/ui/svgs";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";
import { api } from "@nebula/utils/api";

export enum CrmMapSteps {
  UNEDUCATED,
  PIPELINE_SELECTION,
  TRIGGER_SELECTION,
  CONFIRMATION,
}

export default function HubspotMapPage() {
  const { mutateAsync, isLoading: isMutationLoading } =
    api.pipeline.createCrmTriggers.useMutation();

  const { push } = useRouter();

  const [currentStep, setCurrentStep] = useState<CrmMapSteps>(
    CrmMapSteps.UNEDUCATED,
  );

  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline>();

  const [
    selectedCustomerTriggerPipelineStage,
    setSelectedCustomerTriggerPipelineStage,
  ] = useState<PipelineStage>();

  const [
    selectedProspectTriggerPipelineStage,
    setSelectedProspectTriggerPipelineStage,
  ] = useState<PipelineStage>();

  const { data: pipelines, isLoading: isPipelineLoading } =
    api.pipeline.getHubspotPipelines.useQuery(undefined, {
      staleTime: Infinity,
      cacheTime: Infinity,
    });

  const handleConfirmMapping = async () => {
    await mutateAsync({
      triggerProspect: {
        stageId: selectedProspectTriggerPipelineStage!.id,
        stageLabel: selectedProspectTriggerPipelineStage!.label,
        pipelineId: selectedPipeline!.id,
        pipelineLabel: selectedPipeline!.label,
      },
      triggerCustomer: {
        stageId: selectedCustomerTriggerPipelineStage!.id,
        stageLabel: selectedCustomerTriggerPipelineStage!.label,
        pipelineId: selectedPipeline!.id,
        pipelineLabel: selectedPipeline!.label,
      },
    });

    push({
      pathname: ONBOARDING_PATHNAMES.ATTRIBUTION,
    });
  };

  if (isPipelineLoading)
    return (
      <OnboardingLayout>
        <LoadingCard />
      </OnboardingLayout>
    );

  if (!pipelines) {
    throw Error("No pipelines found");
  }

  return (
    <OnboardingLayout
      fixedWith
      title={<>Connect your CRM</>}
      subtitle={<>Map your sales pipeline to your journeys</>}
    >
      <CrmMapStepsDispatcher
        pipelines={pipelines}
        selectedPipeline={selectedPipeline}
        setSelectedPipeline={setSelectedPipeline}
        selectedProspectTriggerPipelineStage={
          selectedProspectTriggerPipelineStage
        }
        setSelectedProspectTriggerPipelineStage={
          setSelectedProspectTriggerPipelineStage
        }
        selectedCustomerTriggerPipelineStage={
          selectedCustomerTriggerPipelineStage
        }
        setSelectedCustomerTriggerPipelineStage={
          setSelectedCustomerTriggerPipelineStage
        }
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleConfirmMapping={handleConfirmMapping}
        isMutationLoading={isMutationLoading}
      />
    </OnboardingLayout>
  );
}

function CrmMapStepsDispatcher({
  currentStep,
  setCurrentStep,

  pipelines,

  selectedPipeline,
  setSelectedPipeline,

  selectedCustomerTriggerPipelineStage,
  setSelectedCustomerTriggerPipelineStage,

  selectedProspectTriggerPipelineStage,
  setSelectedProspectTriggerPipelineStage,
  handleConfirmMapping,

  isMutationLoading,
}: {
  pipelines: Pipeline[];
  currentStep: CrmMapSteps;
  setCurrentStep: Dispatch<SetStateAction<CrmMapSteps>>;
  setSelectedPipeline: Dispatch<SetStateAction<Pipeline | undefined>>;
  selectedPipeline: Pipeline | undefined;
  setSelectedProspectTriggerPipelineStage: Dispatch<
    SetStateAction<PipelineStage | undefined>
  >;
  selectedProspectTriggerPipelineStage: PipelineStage | undefined;
  setSelectedCustomerTriggerPipelineStage: Dispatch<
    SetStateAction<PipelineStage | undefined>
  >;
  selectedCustomerTriggerPipelineStage: PipelineStage | undefined;
  handleConfirmMapping: () => void;
  isMutationLoading: boolean;
}) {
  switch (currentStep) {
    case CrmMapSteps.UNEDUCATED:
      return <Uneducated setCurrentStep={setCurrentStep} />;
    case CrmMapSteps.PIPELINE_SELECTION:
      return (
        <PipelineSelection
          setCurrentStep={setCurrentStep}
          //
          pipelines={pipelines}
          //
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
        />
      );
    case CrmMapSteps.TRIGGER_SELECTION:
      if (!selectedPipeline) throw Error("No pipeline selected");

      return (
        <TriggersSelection
          setCurrentStep={setCurrentStep}
          //
          pipelineStages={selectedPipeline.stages}
          //
          selectedProspectTriggerPipelineStage={
            selectedProspectTriggerPipelineStage
          }
          setSelectedProspectTriggerPipelineStage={
            setSelectedProspectTriggerPipelineStage
          }
          //
          selectedCustomerTriggerPipelineStage={
            selectedCustomerTriggerPipelineStage
          }
          setSelectedCustomerTriggerPipelineStage={
            setSelectedCustomerTriggerPipelineStage
          }
        />
      );
    case CrmMapSteps.CONFIRMATION:
      if (!selectedPipeline) throw Error("No pipeline selected");
      if (!selectedProspectTriggerPipelineStage)
        throw Error("No prospect trigger selected");
      if (!selectedCustomerTriggerPipelineStage)
        throw Error("No customer trigger selected");

      return (
        <Confirmation
          setCurrentStep={setCurrentStep}
          //
          selectedPipeline={selectedPipeline}
          //
          selectedProspectTriggerPipelineStage={
            selectedProspectTriggerPipelineStage
          }
          selectedCustomerTriggerPipelineStage={
            selectedCustomerTriggerPipelineStage
          }
          //
          handleConfirmMapping={handleConfirmMapping}
          //
          isMutationLoading={isMutationLoading}
        />
      );
    default:
      return <Uneducated setCurrentStep={setCurrentStep} />;
  }
}

interface MapStepComponent {
  setCurrentStep: Dispatch<SetStateAction<CrmMapSteps>>;
}

function Uneducated({ setCurrentStep }: MapStepComponent) {
  return (
    <div className="label-default-regular text-content-weak">
      <div className="flex flex-col gap-4">
        <span>
          A Journey gives you an overview of each account's steps throughout
          your sales funnel, unlocking different channels touchpoints between
          every steps.
        </span>
        <span>
          Each Journey is composed of 3 stages: lead, prospect and customer.
        </span>
        <ul className="space-y-2">
          <li>
            <span className="underline">Lead:</span> a company that has not yet
            completed a high-intent action and engaged with your sales team.
          </li>
          <li>
            <span className="underline">Prospect:</span> when your lead
            completes a high-intent action part of your pipeline stages (for
            example, "Demo booked" stage).
          </li>
          <li>
            <span className="underline">Customer:</span> when your sales team
            close a given prospect, which like the prospect stage, is determined
            from your pipeline stages (for example, "Closed won" stage).
          </li>
        </ul>
        <span>
          You will configure the prospect and customer stages based on your
          existing pipeline stages. The lead stage is given to any deal that's
          at a stage prior to prospect.
        </span>
        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => setCurrentStep(CrmMapSteps.PIPELINE_SELECTION)}
            type="button"
            label={<>Continue</>}
          />
        </div>
      </div>
    </div>
  );
}

function PipelineSelection({
  setCurrentStep,
  pipelines,
  selectedPipeline,
  setSelectedPipeline,
}: MapStepComponent & {
  pipelines: Pipeline[];
  selectedPipeline: Pipeline | undefined;
  setSelectedPipeline: Dispatch<SetStateAction<Pipeline | undefined>>;
}) {
  return (
    <div className="flex flex-col gap-4 label-default-regular text-content-weak">
      <span>
        Start by selecting the sales pipeline used to map your account journeys
        into Solstice. By default, in Hubspot - you have the 'Sales Pipeline'.
      </span>
      <Combobox<Pipeline>
        label="Select the pipeline"
        entities={pipelines}
        selectedEntity={selectedPipeline}
        onChange={setSelectedPipeline}
        attributeToFilterOn="label"
        attributeToDisplay="label"
        item={({ entity }) => (
          <div className="flex items-start">
            <span>{entity.label}</span>
          </div>
        )}
      />
      <div className="mt-4 gap-2 flex justify-end">
        <ButtonTertiary
          onClick={() => setCurrentStep(CrmMapSteps.UNEDUCATED)}
          type="button"
          label={<>Previous</>}
        />
        <Button
          onClick={() => setCurrentStep(CrmMapSteps.TRIGGER_SELECTION)}
          type="button"
          disabled={!selectedPipeline}
          label={<>Continue</>}
        />
      </div>
    </div>
  );
}

function TriggersSelection({
  setCurrentStep,
  pipelineStages,
  selectedProspectTriggerPipelineStage,
  selectedCustomerTriggerPipelineStage,
  setSelectedProspectTriggerPipelineStage,
  setSelectedCustomerTriggerPipelineStage,
}: MapStepComponent & {
  pipelineStages: PipelineStage[];
  selectedProspectTriggerPipelineStage: PipelineStage | undefined;
  selectedCustomerTriggerPipelineStage: PipelineStage | undefined;
  setSelectedProspectTriggerPipelineStage: Dispatch<
    SetStateAction<PipelineStage | undefined>
  >;
  setSelectedCustomerTriggerPipelineStage: Dispatch<
    SetStateAction<PipelineStage | undefined>
  >;
}) {
  const stagesAfterSelectOfProspectTrigger = useMemo(() => {
    if (!selectedProspectTriggerPipelineStage) return pipelineStages;
    const displayOrderThreshold =
      selectedProspectTriggerPipelineStage.displayOrder;
    return pipelineStages.filter(
      (stage) => stage.displayOrder > displayOrderThreshold,
    );
  }, [selectedProspectTriggerPipelineStage]);

  return (
    <div className="flex flex-col gap-4 label-default-regular text-content-weak">
      <span>
        What should be the trigger in your CRM to move a deal from the 'Lead'
        step to the 'Prospect' step?
      </span>
      <Combobox<PipelineStage>
        label="Select a trigger for the 'Prospect' step"
        entities={pipelineStages}
        selectedEntity={selectedProspectTriggerPipelineStage}
        onChange={setSelectedProspectTriggerPipelineStage}
        attributeToFilterOn="label"
        attributeToDisplay="label"
        item={({ entity }) => (
          <div className="flex items-start">
            <span>{entity.label}</span>
          </div>
        )}
      />
      <span>
        What should be the trigger in your CRM to move a deal from the
        'Prospect' step to the 'Customer' step?
      </span>
      <Combobox<PipelineStage>
        label="Select a trigger for the 'Customer' step"
        entities={stagesAfterSelectOfProspectTrigger}
        selectedEntity={selectedCustomerTriggerPipelineStage}
        onChange={setSelectedCustomerTriggerPipelineStage}
        attributeToFilterOn="label"
        attributeToDisplay="label"
        item={({ entity }) => (
          <div className="flex items-start">
            <span>{entity.label}</span>
          </div>
        )}
      />
      <div className="mt-4 gap-2 flex justify-end">
        <ButtonTertiary
          onClick={() => setCurrentStep(CrmMapSteps.UNEDUCATED)}
          type="button"
          label={<>Previous</>}
        />
        <Button
          onClick={() => setCurrentStep(CrmMapSteps.CONFIRMATION)}
          type="button"
          disabled={
            !selectedProspectTriggerPipelineStage ||
            !selectedCustomerTriggerPipelineStage
          }
          label={<>Continue</>}
        />
      </div>
    </div>
  );
}

function Confirmation({
  setCurrentStep,
  selectedPipeline,
  selectedProspectTriggerPipelineStage,
  selectedCustomerTriggerPipelineStage,
  handleConfirmMapping,
  isMutationLoading,
}: MapStepComponent & {
  selectedPipeline: Pipeline;
  selectedProspectTriggerPipelineStage: PipelineStage;
  selectedCustomerTriggerPipelineStage: PipelineStage;
  handleConfirmMapping: () => void;
  isMutationLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 label-default-regular text-content-weak">
      <p>
        The <span className="label-default-strong">'Prospect'</span> stage is
        triggered when a deal passes to the{" "}
        <span className="label-default-strong">
          {selectedProspectTriggerPipelineStage.label}{" "}
        </span>
        stage in your CRM.
      </p>
      <p>
        The <span className="label-default-strong">'Customer'</span> stage is
        triggered when a deal passes to the{" "}
        <span className="label-default-strong">
          {selectedCustomerTriggerPipelineStage.label}{" "}
        </span>
        stage in your CRM.
      </p>

      <span>
        Solstice will retrieve, at regular interval, your CRM data to keep it up
        to date. When we notice a deal changes status, via these triggers, our
        data pipeline will detect it and compute the new attribution.
      </span>
      <span>
        You can always change this. But be mindful, as Solstice won't be able to
        re-compute previous data.
      </span>
      <div className="mt-4 gap-2 flex justify-end">
        <ButtonTertiary
          disabled={isMutationLoading}
          onClick={() => setCurrentStep(CrmMapSteps.TRIGGER_SELECTION)}
          type="button"
          label={<>Previous</>}
        />
        <Button
          onClick={handleConfirmMapping}
          type="button"
          disabled={isMutationLoading}
          label={
            isMutationLoading ? (
              <Loading className="h-4 w-4" />
            ) : (
              <span>Confirm</span>
            )
          }
        />
      </div>
    </div>
  );
}
