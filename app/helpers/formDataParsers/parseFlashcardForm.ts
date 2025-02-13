import { parseFormData } from "@mjackson/form-data-parser";
import { fileUploadHandler } from "../fileUploadHandler";
import type { CreateFlashcardArgs } from "~/types/createFlashcardArgs";

export async function parseFlashcardForm(
  request: Request
): Promise<CreateFlashcardArgs> {
  const formData = await parseFormData(request, fileUploadHandler);

  const numCards = parseInt(formData.get("numCards") as string);
  const subject = formData.get("subject") as string;
  const notes = formData.getAll("notes") as string[];

  return {
    notes,
    numCards,
    subject,
  };
}
