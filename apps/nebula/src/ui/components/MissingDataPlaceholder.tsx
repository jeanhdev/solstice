interface MissingDataPlaceholderProps {
  placeholder: string;
  icon: React.ReactNode;
}

export default function MissingDataPlaceholder({
  icon,
  placeholder,
}: MissingDataPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      {icon}
      <span className="label-small-regular text-content-secondary">
        <span>{placeholder}</span>
      </span>
    </div>
  );
}
