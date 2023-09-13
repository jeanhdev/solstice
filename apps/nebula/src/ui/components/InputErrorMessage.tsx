import { type FieldError } from "react-hook-form";

export default function InputErrorMessage({ error }: { error: FieldError }) {
  return (
    <p
      className="paragraph-small-regular mt-2 text-static-content-sentiment-negative"
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      id={`${error.ref}-error`}
    >
      {error.message}
    </p>
  );
}
