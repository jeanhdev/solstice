import clsx from "clsx";

export default function InlineCode({
  code,
  ...props
}: React.ButtonHTMLAttributes<HTMLPreElement> & { code: string }) {
  return (
    <pre className={clsx("suisse-mono inline", props.className)}>{code}</pre>
  );
}
