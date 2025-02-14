import type { ZodSchema, z } from "zod";

export async function parseFormData<T extends ZodSchema>(
  formData: FormData,
  schema: T
): Promise<z.infer<T>> {
  const formEntries = Object.fromEntries(formData.entries());
  const res = schema.parse(formEntries);

  return res;
}
