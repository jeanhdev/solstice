interface JourneyKpisProps {
    title: string;
    metrics: {
        label: string;
        value: string;
    }[]
}

export default function JourneyKpis({
    title,
    metrics
}: JourneyKpisProps) {
    return (
        <div className="border-1 border-divider-weak bg-static-surface-elevated rounded-12 p-6">
            <div className="flex flex-col justify-left gap-8">
            <span  className="label-medium-regular text-content-strong">{title}</span>
            <div className="flex items-center justify-between gap-16">
            {metrics.map((m) => (
                <div className="flex flex-col justify-left gap-1.5">
                <span  className="label-default-regular text-content-default">{m.label}</span>
                <span className="label-small-regular text-content-strong">
                {m.value}
                </span>
                </div> 
            ))}
            </div>
            </div>
        </div>
    )
}