// import clsx from 'clsx';
import clsx from "clsx";
import { PropsWithChildren } from "react";

interface OnboardingLayoutProps extends PropsWithChildren {
  title?: JSX.Element;
  description?: JSX.Element;
  subtitle?: JSX.Element;
  fullWidth?: boolean;
  fixedWith?: boolean;
}

export default function OnboardingLayout({
  children,
  title = undefined,
  description = undefined,
  subtitle = undefined,
  fullWidth = false,
  fixedWith = false,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-static-surface-nested">
      <div className="flex items-center justify-start p-6">
        <div className="w-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            style={{ width: "100%", height: "100%" }}
            alt="Sosltice logo"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={clsx(
            "mt-12 mb-12 flex max-w-120 flex-col gap-8 px-4",
            fullWidth && "w-full",
            fixedWith && "min-w-120",
          )}
        >
          <div>
            <h1 className="title-medium mb-2 text-content-default opacity-100">
              {title}
            </h1>
            {subtitle && (
              <h1
                className={clsx(
                  "title-tiny text-content-moderate opacity-100",
                  description && "mb-2",
                )}
              >
                {subtitle}
              </h1>
            )}
            {description && (
              <div className="label-default-regular text-content-weak">
                {description}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

interface OnboardingSplitLayoutProps {
  title?: JSX.Element;
  description?: JSX.Element;
  firstDescription?: JSX.Element;
  secondDescription?: JSX.Element;
  firstChild: JSX.Element;
  secondChild: JSX.Element;
  firstSubtitle?: JSX.Element;
  secondSubtitle?: JSX.Element;
}

export function OnboardingSplitLayout({
  title = undefined,
  firstChild,
  secondChild,
  firstDescription = undefined,
  secondDescription = undefined,
  firstSubtitle = undefined,
  secondSubtitle = undefined,
}: OnboardingSplitLayoutProps) {
  return (
    <div className="min-h-screen bg-static-surface-nested">
      <div className="flex items-center justify-start p-6">
        <div className="w-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            style={{ width: "100%", height: "100%" }}
            alt="Sosltice logo"
          />
        </div>
      </div>
      <div className="mt-12 mb-12 px-24 container mx-auto">
        <h1 className="title-medium mb-2 text-content-default opacity-100">
          {title}
        </h1>
        <div className="grid grid-cols-2 gap-12 ">
          <div className={clsx("flex flex-col gap-8")}>
            <div>
              {firstSubtitle && (
                <h2
                  className={clsx(
                    "title-tiny text-content-moderate opacity-100",
                    firstDescription && "mb-2",
                  )}
                >
                  {firstSubtitle}
                </h2>
              )}
              {firstDescription && (
                <div className="label-default-regular text-content-weak">
                  {firstDescription}
                </div>
              )}
            </div>
            {firstChild}
          </div>
          <div className={clsx("flex flex-col gap-8")}>
            <div>
              {secondSubtitle && (
                <h2
                  className={clsx(
                    "title-tiny text-content-moderate opacity-100",
                    secondDescription && "mb-2",
                  )}
                >
                  {secondSubtitle}
                </h2>
              )}
              {secondDescription && (
                <div className="label-default-regular text-content-weak">
                  {secondDescription}
                </div>
              )}
            </div>
            {secondChild}
          </div>
        </div>
      </div>
    </div>
  );
}
