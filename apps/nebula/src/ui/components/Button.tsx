import clsx from "clsx";
import React from "react";

import { Loading } from "../svgs";

export function Button({
  label,
  disabled = false,
  isLoading = false,
  size = "default",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "compact" | "default";
  type?: "button" | "submit";
}) {
  return (
    <button
      disabled={disabled || isLoading}
      type={type}
      className={clsx(
        size === "default" && "h-9 px-4",
        size === "compact" && "h-8 px-3",
        isLoading && "cursor-not-allowed bg-opacity-50 text-opacity-50",
        disabled &&
          "cursor-not-allowed bg-interactive-fill-primary-disabled text-interactive-fill-primary-on-disabled",
        !disabled &&
          "bg-interactive-fill-primary-enabled text-interactive-fill-primary-on-enabled",
        !isLoading && "hover:bg-interactive-fill-primary-hover",
        "label-default-regular relative flex w-fit items-center justify-center rounded-6  shadow-none transition-button focus:outline-none active:bg-interactive-fill-primary-pressed active:outline-none",
      )}
      {...props}
    >
      <span className={clsx("w-full text-center")}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loading className="w-3 h-3" />
            <span>{label}</span>
          </span>
        ) : (
          <span>{label}</span>
        )}
      </span>
    </button>
  );
}

export const ButtonSecondary = React.forwardRef(
  (
    {
      label,
      icon = undefined,
      disabled = false,
      size = "default",
      type = "button",
      fullWidth = false,
      ...props
    }: Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "label" | "disabled" | "size" | "type" | "fullWidth"
    > & {
      icon?: JSX.Element;
      label: JSX.Element;
      disabled?: boolean;
      size?: "compact" | "default";
      type?: "button" | "submit";
      fullWidth?: boolean;
    },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        type={type}
        className={clsx(
          fullWidth && "w-full",
          !!icon && "flex items-center gap-2",
          size === "default" && "h-9 px-4 label-default-regular",
          size === "compact" && "h-8 px-3 label-small-regular",
          disabled
            ? "cursor-not-allowed bg-interactive-fill-secondary-disabled text-interactive-fill-secondary-on-disabled"
            : "bg-interactive-fill-secondary-enabled text-interactive-fill-secondary-on-enabled",
          "relative flex w-fit items-center justify-start gap-1 rounded-6 border border-interactive-outline-secondary-enabled shadow-none transition-button hover:bg-interactive-fill-secondary-hover focus:outline-none active:bg-interactive-fill-secondary-pressed active:outline-none",
        )}
        {...props}
        ref={ref}
      >
        {icon && <div>{icon}</div>}
        <span>{label}</span>
      </button>
    );
  },
);

export function ButtonTertiary({
  label,
  icon = undefined,
  disabled = false,
  size = "default",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  label: JSX.Element;
  disabled?: boolean;
  size?: "compact" | "default";
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={clsx(
        size === "default" && "h-9 px-4",
        size === "compact" && "h-8 px-3",
        disabled
          ? "cursor-not-allowed bg-interactive-fill-secondary-disabled text-interactive-fill-secondary-on-disabled"
          : "cursor-pointer bg-interactive-fill-secondary-enabled text-interactive-fill-secondary-on-enabled",
        "label-default-regular relative flex w-fit items-center gap-1 rounded-6 shadow-none transition-button hover:bg-interactive-fill-secondary-hover focus:outline-none active:bg-interactive-fill-secondary-pressed active:outline-none",
      )}
      {...props}
    >
      {icon && <div className="h-4 w-4">{icon}</div>}
      <span className={clsx("w-full text-center")}>{label}</span>
    </button>
  );
}
