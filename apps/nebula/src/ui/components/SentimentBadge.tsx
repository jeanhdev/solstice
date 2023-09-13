import clsx from "clsx";

export enum LabelStatus {
  POSITIVE = "positive",
  CAUTION = "caution",
}

export const SentimentBadge = ({
  label,
  status,
  circle = true,
}: {
  label: string;
  status: LabelStatus;
  circle?: boolean;
}) => {
  return (
    <div
      className={clsx({
        "flex h-fit w-fit items-center justify-start rounded-4 px-2 py-[0.5px] text-label-small-regular":
          true,
        "bg-static-surface-sentiment-positive": status === LabelStatus.POSITIVE,
        "bg-static-surface-sentiment-caution": status === LabelStatus.CAUTION,
      })}
    >
      {circle && (
        <div
          className={clsx(
            "mr-2 h-1 w-1 rounded-full",
            status === LabelStatus.POSITIVE &&
              "bg-static-content-sentiment-positive",
            status === LabelStatus.CAUTION &&
              "bg-static-content-sentiment-caution",
          )}
        />
      )}
      <span>{label}</span>
    </div>
  );
};
