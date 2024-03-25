import slugify from "slugify";
import { z } from "zod";

export const safeParse = <T>(value: any, schema: z.Schema<T>): T => {
  const result = schema.safeParse(value);
  if (result.success) {
    return result.data as T;
  } else {
    throw new Error(`Invalid data for schema ${schema.toString()}`);
  }
};

export const createSlug = (str: string) =>
  slugify(str, {
    lower: true,
    replacement: "-",
  });

export interface oauthConfirmationPageProps {
  code: string;
}
