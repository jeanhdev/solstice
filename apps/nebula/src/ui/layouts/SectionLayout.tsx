export default function SectionLayout({
  title,
  children,
  description,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="paragraph-large text-white">
        <span>{title}</span>
      </h2>
      <hr className="divider-default" />
      {description && (
        <div className="label-default-regular text-content-moderate">
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
