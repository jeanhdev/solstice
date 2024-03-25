import { Menu, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";

import { ButtonSecondary } from "@nebula/ui/components/Button";
import { AttributionModels as AttributionModelsSvg } from "@nebula/ui/svgs";
import { useQuerySafely } from "@nebula/hooks";
import { useSafePerformanceStore } from "@nebula/stores/performance";

export default function AttributionModelMenu() {
  const { selectedAttributionModel, setSelectedAttributionModel } =
    useSafePerformanceStore();

  const { data: me } = useQuerySafely.useMe();

  return (
    <Menu as="div" className="relative z-[999]">
      <Menu.Button
        as={ButtonSecondary}
        fullWidth
        size="compact"
        label={<>{selectedAttributionModel?.name}</>}
        icon={<AttributionModelsSvg className="h-5 w-5 text-orange-crazy" />}
      />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[100] mt-2 block w-56 origin-top-right rounded-6 border border-interactive-outline-secondary-enabled bg-interactive-fill-secondary-enabled-pure p-2 text-interactive-fill-secondary-on-enabled">
          {me.attributionModels
            .map((m) => ({
              ...m,
              isSelected: m.key === selectedAttributionModel.key,
            }))
            .map((model) => (
              <Menu.Item key={model.key}>
                <div
                  onClick={() => setSelectedAttributionModel(model)}
                  className={clsx(
                    !model.isSelected &&
                      "hover:cursor-pointer hover:bg-interactive-fill-secondary-hover",
                    "label-small-regular relative select-none rounded-6 py-2 pl-3 pr-9 text-content-default",
                  )}
                >
                  <span>{model.name}</span>
                  {model.isSelected ? (
                    <span
                      className={clsx(
                        model.isSelected && "text-white",
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                      )}
                    >
                      <CheckIcon
                        className="h-4 w-4 text-content-default"
                        aria-hidden="true"
                      />
                    </span>
                  ) : null}
                </div>
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
