import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { isEmpty } from "lodash";
import { Fragment, type HTMLProps } from "react";
import { type FieldError } from "react-hook-form";

import { InputErrorMessage } from "@nebula/ui/components";
import { Dropdown } from "@nebula/ui/svgs";
import { type Option } from "@nebula/types";

interface SelectInputGroupProps {
  name: string;
  label?: string;
  error: FieldError | undefined;
  handleListboxChange: (option: Option) => void;
  selectedOption: Option;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  additionalInputProps?: HTMLProps<HTMLInputElement>;
  options: Option[];
  optionDisplayAxis?: "vertical-bottom" | "vertical-top";
}

export default function SelectInputGroup({
  name,
  label,
  error,
  placeholder,
  handleListboxChange,
  options,
  selectedOption,
}: SelectInputGroupProps) {
  return (
    <div>
      <Listbox value={selectedOption} onChange={handleListboxChange}>
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label
                htmlFor={name}
                className="paragraph-small-regular block capitalize text-content-weak"
              >
                {label}
              </Listbox.Label>
            )}
            <div className="relative mt-1">
              <Listbox.Button
                className={clsx({
                  "label-default-regular flex h-[38px] w-full items-center justify-start rounded-6 border bg-interactive-overlay-secondary-selected-enabled px-3 text-content-default shadow-none focus:outline-none focus:ring-0":
                    true,
                  "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
                    !error,
                  "border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled":
                    error,
                })}
              >
                <span className="block truncate">
                  {isEmpty(selectedOption.value)
                    ? placeholder || (
                        <span className="text-content-weak">
                          Select an option...
                        </span>
                      )
                    : selectedOption.label}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Dropdown
                    className="h-5 w-5 text-[#e3e5e8]"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-6 bg-static-surface-raised p-2 focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          active
                            ? "rounded-6 text-white hover:cursor-pointer hover:bg-static-surface-elevated"
                            : "",
                          "relative select-none py-2 pl-3 pr-9",
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              "label-default-regular text-content-default",
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? "text-white" : "",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon
                                className="h-4 w-4 text-[#e3e5e8]"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            {error && <InputErrorMessage error={error} />}
          </>
        )}
      </Listbox>
    </div>
  );
}
