import { Divider } from "~/components/base/divider";
import { Heading } from "~/components/base/heading";
import { Text } from "~/components/base/text";
import type { Flashcard } from "~/types/flashcard";
import { redirect, useFetcher } from "react-router";
import { Input } from "~/components/base/input";
import { Button } from "~/components/base/button";
import { requireAuthentication } from "~/services/auth.server";
import { parseFormData } from "~/helpers/parseFormData";
import { newUploadGroup } from "~/schemas/newUploadGroup";
import { generateFlashcardRespone } from "~/operations/generateFlashcardResponse";
import { saveUploadGroup } from "~/operations/saveUploadGroup";
import type { Route } from "./+types/createUpload";

export async function action({ request, params }: Route.ActionArgs) {
  const user = await requireAuthentication(request);

  const formData = await request.formData();

  const { files, numCards, uploadName } = await parseFormData(
    formData,
    newUploadGroup
  );

  const filesArray = Array.isArray(files) ? files : [files];

  const flashcards = await generateFlashcardRespone(numCards, filesArray);

  const classId = params.classId;
  const parsedClassId = parseInt(classId);

  await saveUploadGroup(
    parsedClassId,
    uploadName,
    user.id,
    filesArray,
    flashcards
  );

  return redirect(`/classes/${classId}`);
}

export default function CreateUpload() {
  const fetcher = useFetcher<Flashcard[]>();
  const busy = fetcher.state !== "idle";

  return (
    <div className="mb-4">
      <Heading>Generate more flashcards</Heading>
      <div className="mt-2">
        <Text>Its simple! Upload a picture and get notecards back!</Text>
      </div>
      <Divider className="my-2" />
      <fetcher.Form method="post" encType="multipart/form-data">
        <Text>Upload Name</Text>
        <Input
          name="uploadName"
          required
          type="text"
          placeholder="Enter upload name..."
          className="mb-4"
        />
        <Text>Select an image to upload...</Text>
        <Input
          className="mb-4"
          required
          type="file"
          name="files"
          multiple
          placeholder="Select a picture of notes!"
        />
        <Text>Number of Notecards</Text>
        <Input
          name="numCards"
          required
          type="number"
          placeholder="Enter number..."
          className="mb-4"
        />
        <Button disabled={busy} color="green" className="w-full" type="submit">
          {busy && (
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {busy ? "Generating Notecards..." : "Get Notecards!"}
        </Button>
      </fetcher.Form>
    </div>
  );
}
