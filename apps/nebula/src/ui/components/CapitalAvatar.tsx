export default function CapitalAvatar({
    name,
}: {
    name: string
}) {
    return (<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white">
    <span className="text-sm font-medium capitalize leading-none text-black">
      {name[0]}
    </span>
  </span>)
}