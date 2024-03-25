import clsx from "clsx";
import { type HTMLProps } from "react";
import { type FieldError, type UseFormRegister } from "react-hook-form";

import InputErrorMessage from "@nebula/ui/components/InputErrorMessage";

interface TextInputGroupProps {
  type?: string;
  autofocus?: boolean;
  name: string;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  additionalInputProps?: HTMLProps<HTMLInputElement>;
}

export default function TextInputGroup({
  type = "text",
  autofocus = false,
  name,
  label,
  register,
  error,
  placeholder = "",
  defaultValue = "",
  disabled = false,
  fullWidth = false,
  maxLength = undefined,
  additionalInputProps = {},
}: TextInputGroupProps) {
  return (
    <div className={clsx({ "w-full": fullWidth })}>
      <label
        htmlFor={name}
        className="paragraph-small-regular block capitalize text-content-weak"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-6 shadow-none">
        <input
          maxLength={maxLength}
          type={type}
          id={name}
          disabled={disabled}
          className={clsx({
            "flex w-full items-center rounded-6 border bg-interactive-fill-utility-input px-3 focus:outline-none focus:ring-0":
              true,
            "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
              !error,
            "border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled":
              error,
            "label-default-regular text-content-default": true,
          })}
          placeholder={!error ? placeholder : ""}
          defaultValue={defaultValue}
          autoFocus={autofocus}
          {...register(name)}
          {...additionalInputProps}
        />
      </div>
      {error && <InputErrorMessage error={error} />}
    </div>
  );
}

export function UnregisteredTextInputGroup({
  name,
  value,
  label,
  onChange,
  type = "text",
  autofocus = false,
  placeholder = "",
  defaultValue = "",
  disabled = false,
  fullWidth = false,
  maxLength = undefined,
  additionalInputProps = {},
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autofocus?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  additionalInputProps?: HTMLProps<HTMLInputElement>;
}) {
  return (
    <div className={clsx({ "w-full": fullWidth })}>
      <label
        htmlFor={name}
        className="paragraph-small-regular block capitalize text-content-weak"
      >
        {label}
      </label>
      <div className={clsx("relative rounded-6 shadow-none", label && "mt-1")}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          type={type}
          id={name}
          disabled={disabled}
          className={clsx({
            "flex w-full items-center rounded-6 border bg-interactive-fill-utility-input px-3 focus:outline-none focus:ring-0":
              true,
            "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
              // !error
              true,
            // 'border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled':
            //   error,
            "label-default-regular text-content-default": true,
          })}
          placeholder={placeholder || ""}
          defaultValue={defaultValue}
          autoFocus={autofocus}
          // {...register(name)}
          {...additionalInputProps}
        />
      </div>
      {/* {error && <Inp2utErrorMessage error={error} />} */}
    </div>
  );
}
