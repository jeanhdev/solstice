import { Loading } from "@nebula/ui/svgs";

export default function LoadingCard() {
  return (
    <div className="grid place-items-center p-4">
      <div className="flex items-center gap-2">
        <Loading className="h-4 w-4 animate-spin text-orange-600" />
        <span className="label-default-strong">Loading</span>
      </div>
    </div>
  );
}
