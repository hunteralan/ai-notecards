export async function getFileDataUrl(fileUpload: File) {
  const buffer = await fileUpload.arrayBuffer();
  const base64String = Buffer.from(buffer).toString("base64");
  return `data:${fileUpload.type};base64,${base64String}`;
}
