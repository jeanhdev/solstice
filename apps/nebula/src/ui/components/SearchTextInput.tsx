import clsx from "clsx";
import { HTMLProps } from "react";

interface TextInputGroupProps {
  name: string;
  placeholder: string;
  value: string;
  handleChange: (newValue: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  additionalInputProps?: HTMLProps<HTMLInputElement>;
}

export default function SearchTextInput({
  name,
  value,
  placeholder,
  handleChange,
  defaultValue = undefined,
  disabled = false,
  fullWidth = false,
  maxLength = undefined,
  additionalInputProps = {},
}: TextInputGroupProps) {
  return (
    <div className={clsx({ "w-full": fullWidth })}>
      <div className="relative rounded-6 shadow-none">
        <input
          maxLength={maxLength}
          type="text"
          id={name}
          disabled={disabled}
          className={clsx({
            "flex w-full items-center rounded-6 border bg-interactive-fill-utility-input px-3 focus:outline-none focus:ring-0":
              true,
            "border-interactive-outline-secondary-enabled focus:border-interactive-outline-primary-selected-hover":
              true,
            // 'border-interactive-outline-negative-selected-enabled focus:border-interactive-outline-negative-selected-enabled':
            //   error,
            "label-default-regular text-content-default": true,
          })}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...additionalInputProps}
        />
      </div>
    </div>
  );
}
