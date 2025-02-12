import type { FileUpload, FileUploadHandler } from "@mjackson/form-data-parser";

export async function fileUploadHandler(fileUpload: FileUpload) {
  const buffer = await fileUpload.arrayBuffer();
  const base64String = Buffer.from(buffer).toString("base64");
  return `data:${fileUpload.type};base64,${base64String}`;
}
