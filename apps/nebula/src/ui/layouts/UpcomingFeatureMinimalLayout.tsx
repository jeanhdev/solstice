import { ReactNode } from "react";

export default function UpcomingFeatureMinimalLayout({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <div className="px-12 py-12">
      <div className="mx-auto flex w-fit gap-36 pl-8 pt-20">
        <div className="max-w-96 pt-20">
          <div className="flex flex-col gap-4">
            <h1 className="title-small text-content-strong">{title}</h1>
            <p className="paragraph-default-regular text-content-moderate">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-120" />
    </div>
  );
}
