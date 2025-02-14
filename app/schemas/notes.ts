import { z } from "zod";

export const note = z.object({ question: z.string(), answer: z.string() });
