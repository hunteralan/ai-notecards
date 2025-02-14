import { parseFormData as fileFormDataHandler } from "@mjackson/form-data-parser";
import { fileUploadHandler } from "../fileUploadHandler";
import type { CreateFlashcardArgs } from "~/types/createFlashcardArgs";
import { parseFormData } from "../parseFormData";
import { newFlashcardArgs } from "~/schemas/newFlashcardArgs";

export async function parseFlashcardForm(
  request: Request
): Promise<CreateFlashcardArgs> {
  const formData = await fileFormDataHandler(request, fileUploadHandler);

  const parsedData = await parseFormData(formData, newFlashcardArgs);

  return parsedData;
}
