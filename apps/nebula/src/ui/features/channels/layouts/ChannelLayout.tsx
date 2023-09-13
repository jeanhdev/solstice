import { type PropsWithChildren } from "react";

interface ChannelLayoutProps extends PropsWithChildren {
  title: JSX.Element;
  sideNotification?: JSX.Element;
}

export default function ChannelLayout({
  children,
  title,
  sideNotification = undefined,
}: ChannelLayoutProps) {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between bg-static-surface-nested px-12 py-12">
        <div className="flex flex-shrink-0 flex-col gap-2">
          <div className="flex items-center gap-8">
            <h1 className="title-medium w-56 min-w-64 whitespace-nowrap text-content-strong">
              {title}
            </h1>
          </div>
        </div>
        {sideNotification && <div>{sideNotification}</div>}
      </div>
      <div>{children}</div>
    </main>
  );
}
