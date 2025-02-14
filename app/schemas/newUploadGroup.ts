import { z } from "zod";

export const newUploadGroup = z.object({
  numCards: z.coerce.number(),
  files: z.array(z.instanceof(File)).or(z.instanceof(File)),
  uploadName: z.string(),
});
