import { z } from "zod";
import { note } from "./notes";

export const flashcards = z.object({
  cards: z.array(note),
});
