import Link from "next/link";
import { useRouter } from "next/router";
import { AttributionModel } from "@solstice/cosmos/tables/attribution-models";
import { find } from "lodash";
import { useState } from "react";

import {
  Button,
  ButtonTertiary,
  Combobox,
  SentimentBadge,
  ToggleInput,
} from "@nebula/ui/components";
import { LabelStatus } from "@nebula/ui/components/SentimentBadge";
import { LoadingLayout, OnboardingLayout } from "@nebula/ui/layouts";
import { Loading } from "@nebula/ui/svgs";
import { ONBOARDING_PATHNAMES } from "@nebula/constants";
import { LocalAttributionModel, hasErrorKey } from "@nebula/types";
import { api } from "@nebula/utils/api";

const localAttributionModels: LocalAttributionModel = {
  ["FIRST_TOUCH"]: (
    <>
      Gives all of the deal revenue credit to the first touchpoint in a
      customer's journey. This model puts emphasis on top-of-the-funnel
      marketing channels that introduce users to the brand to serve objectives
      such as brand-awareness.{" "}
      <Link href="/guide/models/first-touch" className="link">
        Read more.
      </Link>
    </>
  ),
  ["LAST_TOUCH"]: (
    <>
      Gives all of the deal revenue credit to the last touchpoint before
      conversion, which is usually direct traffic. This model puts the emphasis
      on bottom-of-the-funnel marketing channels. Read more about it.{" "}
      <Link href="/guide/models/first-touch" className="link">
        Read more.
      </Link>
    </>
  ),
  ["LINEAR"]: (
    <>
      Gives equal credit to all touchpoints in a customer's journey. This model
      puts emphasis on a multi-channel approach where all channels work together
      to drive the final conversion. Read more about this model.{" "}
      <Link href="/guide/models/first-touch" className="link">
        Read more.
      </Link>
    </>
  ),
};

enum AttributionChoicesSteps {
  SELECT_MODELS,
  CHOOSE_DEFAULT,
}

export default function OnboardingAttribution() {
  const { push } = useRouter();

  const { data: attributionModels, isLoading } =
    api.performance.getAttributionModels.useQuery();

  const [selectedAttributionModels, setSelectedAttributionModels] = useState<
    AttributionModel[]
  >([]);

  const [selectedDefaultAttributionModel, setSelectedDefaultAttributionModel] =
    useState<AttributionModel>();

  const [currentStep, setCurrentStep] = useState<AttributionChoicesSteps>(
    AttributionChoicesSteps.SELECT_MODELS,
  );

  const { mutateAsync, isLoading: isMutationLoading } =
    api.user.updateAttributionModels.useMutation({
      onSuccess: () => push({ pathname: ONBOARDING_PATHNAMES.FINISH }),
    });

  const handleToggleAttributionModel = (model: AttributionModel) => {
    if (
      find(
        selectedAttributionModels,
        (selectedModel) => selectedModel.key === model.key,
      )
    ) {
      setSelectedAttributionModels(
        selectedAttributionModels.filter(
          (selectedModel) => selectedModel.key !== model.key,
        ),
      );
    } else {
      setSelectedAttributionModels([...selectedAttributionModels, model]);
    }
  };

  const handlePreviousStep = () => {
    setSelectedDefaultAttributionModel(undefined);
    setCurrentStep(AttributionChoicesSteps.SELECT_MODELS);
  };

  const handleNextStep = () =>
    setCurrentStep(AttributionChoicesSteps.CHOOSE_DEFAULT);

  const handleConfirmSelectedModels = () =>
    mutateAsync({
      updatedAttributionModels: selectedAttributionModels.map(
        (selectedModel) => ({
          attributionModelId: selectedModel.id,
          isDefaut: selectedModel.key === selectedDefaultAttributionModel?.key,
        }),
      ),
    });

  if (isLoading) return <LoadingLayout />;

  if (!isLoading && hasErrorKey(attributionModels)) {
    throw new Error(attributionModels.errorKey);
  }

  if (
    currentStep === AttributionChoicesSteps.CHOOSE_DEFAULT &&
    !!selectedAttributionModels.length
  ) {
    return (
      <OnboardingLayout
        title={<>Attribution</>}
        subtitle={<>Choose your default model</>}
        description={
          <div className="flex flex-col gap-2">
            <p>
              You choose the following models:{" "}
              {selectedAttributionModels.map((m) => m.name).join(", ")}.
            </p>
            <p>
              You will soon be able to switch from model to models to gain the
              most complete picture of your attribution.
            </p>
            <p>
              To personalize your experience, we need you to chose a default
              model, the one that will get displayed by default in your app.
            </p>
          </div>
        }
      >
        <div className="flex flex-col gap-8">
          <Combobox<AttributionModel>
            label="Select your default model"
            entities={selectedAttributionModels}
            selectedEntity={selectedDefaultAttributionModel}
            onChange={(selectedModel) =>
              setSelectedDefaultAttributionModel(selectedModel)
            }
            attributeToFilterOn="name"
            attributeToDisplay="name"
            item={({ entity }) => (
              <div className="flex items-start">
                <span>{entity.name}</span>
              </div>
            )}
          />
        </div>
        <div className="mt-4 gap-2 flex justify-end">
          <ButtonTertiary
            onClick={handlePreviousStep}
            type="button"
            label={<span>Previous</span>}
          />
          <Button
            onClick={handleConfirmSelectedModels}
            type="button"
            disabled={isMutationLoading || !selectedDefaultAttributionModel}
            label={
              isMutationLoading ? (
                <Loading className="h-4 w-4" />
              ) : (
                <span>Continue</span>
              )
            }
          />
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout
      title={<>Attribution</>}
      subtitle={<>Choose your attribution models</>}
      description={
        <div className="flex flex-col gap-2">
          <p>
            Because having only one attribution model will only give you a
            partial view, we allow you to choose multiple models.
          </p>
          <p>
            Currently, Solstice is doing attribution computing every day at
            midnight (EST). We will compute the attribution data, whenever a
            journey gets triggered, on all your enabled models.
          </p>
          <p>
            If you want to add, or remove, a given model - you will be able to
            do so. And it works retroactively - we will re-compute all your past
            data if you add a new model and nothing will get deleted if you
            chose to stop computing for one model.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        {/* @ts-ignore */}
        {attributionModels.map((model: AttributionModel) => (
          <div key={model.key} className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 justify-between">
                <span className="label-large-regular block text-content-default">
                  {model.name}
                </span>
                {model.isMultiTouch && (
                  <SentimentBadge
                    circle={false}
                    status={LabelStatus.POSITIVE}
                    label="Multi-touch"
                  />
                )}
              </div>
              <ToggleInput
                enabled={
                  !!find(
                    selectedAttributionModels,
                    (selectedModel) => selectedModel.key === model.key,
                  )
                }
                handleChange={() => handleToggleAttributionModel(model)}
              />
            </div>
            {!find(
              selectedAttributionModels,
              (selectedModel) => selectedModel.key === model.key,
            ) && (
              <p className="label-small-regular max-w-[80%] text-content-weak">
                {localAttributionModels[model.key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 gap-2 flex justify-end">
        <Button
          disabled={!selectedAttributionModels.length}
          onClick={handleNextStep}
          type="button"
          label={<span>Continue</span>}
        />
      </div>
    </OnboardingLayout>
  );
}
