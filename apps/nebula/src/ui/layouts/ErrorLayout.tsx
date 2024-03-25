import Link from "next/link";

import { SolsticeLogo } from "@nebula/ui/svgs";

export default function ErrorLayout({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: unknown[]) => void;
}) {
  return (
    <div className="h-screen">
      <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-static-surface-nested lg:grid-cols-[max(50%,36rem),1fr]">
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <a href="/">
            <span className="sr-only">Solstice</span>
            <SolsticeLogo />
          </a>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-8 text-orange-crazy">
              500
            </p>
            <h1 className="mt-4 font-suisse-intl text-3xl font-bold tracking-tight text-content-default sm:text-5xl">
              An error occurred
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              <span className="block">
                Sorry, our team got notified and we're investigating.
              </span>
              <span>Please try again later.</span>
            </p>
            <div className="mt-10">
              <Link href="/" onClick={() => resetErrorBoundary()}>
                <span className="link label-default-regular">
                  <span aria-hidden="true">&larr;</span> Back home
                </span>
              </Link>
            </div>
          </div>
        </main>

        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
          <img
            src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=918&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
