import { type AttributionModel } from "@solstice/cosmos/tables/attribution-models";
import { find } from "lodash";
import { useState } from "react";

import {
  Button,
  ButtonTertiary,
  Dialog,
  ToggleInput,
} from "@nebula/ui/components";
import { type DialogProps } from "@nebula/ui/components/Dialog";
import { SettingsLayout } from "@nebula/ui/layouts";
import { Connector } from "@nebula/ui/svgs";
import { ToggleMode } from "@nebula/types";
import { api } from "@nebula/utils/api";

export default function AttributionSettingsPage() {
  const [toggledModel, setToggledModel] = useState<AttributionModel>();
  const [toggleMode, setToggleMode] = useState<ToggleMode>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = api.user.getMe.useQuery();

  const handleToggleAttributionModel = (model: AttributionModel) => {
    setToggledModel(model);
    setToggleMode(model.isEnabled ? ToggleMode.DISABLE : ToggleMode.ENABLE);
    setIsOpen(true);
  };

  return (
    <SettingsLayout>
      <section className="max-w-152" aria-labelledby="account-details">
        <div className="px-8 py-12">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-title-medium font-title-medium text-white">
                Attribution
              </h1>
              <div className="pb-2" />
              <p className="label-default-regular text-content-moderate">
                Because having only one attribution model will only give you a
                partial view, we allow you to choose multiple models. Solstice
                does calculations every 24h, so you need to select these models
                in advance in order to be able to select them afterwards.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-title-tiny font-title-tiny text-content-default">
                Default model
              </h2>
              <div className="flex flex-col gap-8">
                <p className="paragraph-medium-regular max-w-104 text-content-weak">
                  Solstice will compute the attribution daily on all your
                  enabled models. However, you can choose a default model that
                  will be selected on the top right corner whenever you access
                  the platform.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-title-tiny font-title-tiny text-content-default">
                Models
              </h2>
              <div className="flex flex-col gap-8">
                {localAttributionModels.map((model) => {
                  const correspondingModel = find(data.attributionModels, {
                    key: model.key,
                  });

                  if (!correspondingModel) return null;

                  return (
                    <div key={model.key} className="flex flex-col gap-2">
                      <span className="label-large-regular block text-content-default">
                        {model.name}
                      </span>
                      <div className="flex items-start justify-between">
                        <p className="paragraph-medium-regular max-w-104 text-content-weak">
                          {model.description}
                        </p>
                        <ToggleInput
                          enabled={correspondingModel.isEnabled}
                          handleChange={() =>
                            handleToggleAttributionModel(correspondingModel)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {toggleMode && toggledModel && (
        <DialogAttributionToggleDispatcher
          toggleMode={toggleMode}
          toggledModel={toggledModel}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </SettingsLayout>
  );
}

function DialogAttributionToggleDispatcher({
  toggledModel,
  toggleMode,
  isOpen,
  setIsOpen,
}: {
  toggledModel: AttributionModel;
  toggleMode: ToggleMode;
  isOpen: DialogProps["isOpen"];
  setIsOpen: DialogProps["setIsOpen"];
}) {
  if (toggleMode === ToggleMode.ENABLE) {
    return (
      <Dialog
        maxW="md"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<>Enable {toggledModel.name}</>}
        body={
          <div className="paragraph-medium-regular flex flex-col gap-2 text-content-moderate">
            <Connector className="h-5 w-5" />
            <p>
              Once you enable {toggledModel.name}, Solstice will start computing
              the attribution on all of your existing data.
            </p>
            <p>
              You will be able to access attribution for this given model
              tomorrow at midnight.
            </p>
          </div>
        }
        cta={
          <div className="flex justify-end gap-2">
            <ButtonTertiary
              onClick={() => setIsOpen(false)}
              label={<>Back</>}
            />
            <Button label={<>Enable</>} />
          </div>
        }
      />
    );
  }

  if (toggleMode === ToggleMode.DISABLE) {
    return (
      <Dialog
        maxW="md"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<>Disable {toggledModel.shortName}</>}
        body={
          <div className="paragraph-medium-regular flex flex-col gap-2 text-content-moderate">
            <Connector className="h-5 w-5" />
            <p>
              If you disable {toggledModel.name}, Solstice will stop computing
              the daily attribution on this model which mean that you will not
              be able to access the data previously computed for this model.
            </p>
            <p>
              However, if you wish to re-enable it in the future You can still
              re-enable it in the future, we will re-compute the attribution on
              your past data.
            </p>
          </div>
        }
        cta={
          <div className="flex justify-end gap-2">
            <ButtonTertiary
              onClick={() => setIsOpen(false)}
              label={<>Back</>}
            />
            <Button label={<>Disable</>} />
          </div>
        }
      />
    );
  }
}
