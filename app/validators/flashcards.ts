import { z } from "zod";

export const flashcard = z.object({
  cards: z.array(z.object({ question: z.string(), answer: z.string() })),
});
