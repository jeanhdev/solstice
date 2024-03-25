import { SolsticeLogo } from "@nebula/ui/svgs";


export default function HomePage() {
  return (
    <div className="h-screen">
      <div className="min-h-full bg-static-surface-nested">
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <a href="/">
            <span className="sr-only">Solstice</span>
            <SolsticeLogo />
          </a>
        </header>
        <main className="mx-auto w-full grid place-items-center max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-8 text-orange-crazy">
              Update
            </p>
            <h1 className="mt-4 font-suisse-intl text-3xl font-bold tracking-tight text-white-strong sm:text-5xl">
              Goodbye 👋
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-400">
            Solstice closed down on 1st September 2023. We are no longer
            accepting new customers or providing support to existing
            customers. We attempted to solve revenue attribution for B2B SaaS, we failed to find product market fit. <br /> <br /> You can find out more about where we're respectively headed below 👇
            <br />
            <br />
            <a href="https://www.linkedin.com/in/jeanhirtz/" className="link">Jean</a> and <a className="link" href="https://www.linkedin.com/in/thibault-pedelhez-517aa1107/">Thibault</a>
            </p>
        
          </div>
        </main>

        
      </div>
    </div>
  );
}
