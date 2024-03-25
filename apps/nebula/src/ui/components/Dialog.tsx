import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

import { XMark } from "@nebula/ui/svgs";

export interface DialogProps {
  title: JSX.Element;
  body: JSX.Element;
  cta: JSX.Element;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  maxW?: "sm" | "md" | "lg";
}

export default function Dialog({
  title,
  body,
  cta,
  isOpen,
  setIsOpen,
  maxW = "sm",
}: DialogProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-static-surface-scrim transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialog.Panel
                className={clsx({
                  "relative transform overflow-hidden rounded-lg bg-static-surface-raised px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6":
                    true,
                  "max-w-96": maxW === "sm",
                  "sm:max-w-120": maxW === "md",
                  "sm:max-w-192": maxW === "lg",
                })}
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="h6 w-6 rounded-6 bg-interactive-fill-secondary-enabled"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMark className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="flex-col gap-6 sm:flex sm:items-start">
                    <HeadlessDialog.Title
                      as="h3"
                      className="title-small text-center sm:text-left"
                    >
                      {title}
                    </HeadlessDialog.Title>
                    {body}
                  </div>
                  <div className="pb-10" />
                  {cta}
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}
