import { type NextApiRequest, type NextApiResponse } from "next";
import isNil from "lodash/isNil";
import { round } from "lodash";

export function allowGivenMethodOnly({
  req,
  res,
  method,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  method: "POST" | "GET" | "PUT" | "DELETE";
}) {
  if (req.method !== method)
    return res.status(405).send({
      message: `Method ${
        req.method as string
      } not allowed - only ${method} is allowed.`,
    });
}

export function convertStringToInt({ string }: { string: string }) {
  const int = parseInt(string, 10);
  if (isNaN(int)) {
    throw new Error(
      "The string could not be converted to a number and is NaN.",
    );
  }
  return { int };
}

export function convertIntToString({ int }: { int: number }): {
  string: string;
} {
  const string = int.toString();
  return { string };
}

export function guardIsNil<T>(obj: unknown): asserts obj is T {
  if (isNil(obj)) {
    throw new Error("The object is nil.");
  }
}


export const convertAmountToUSDString = ({amount}: {amount: string}) => {
  const roundedAmount = round(parseFloat(amount as string), 2)
          return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(roundedAmount);
}