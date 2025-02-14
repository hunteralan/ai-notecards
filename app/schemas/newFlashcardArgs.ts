import { z } from "zod";

export const newFlashcardArgs = z.object({
  numCards: z.number(),
  notes: z.array(z.string()),
});
