import { z } from "zod";

export const newClass = z.object({
  subject: z.string(),
});
