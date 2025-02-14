import { Text } from "~/components/base/text";
import type { Route } from "./+types/home";
import { Input } from "~/components/base/input";
import { redirect, useFetcher, type MetaFunction } from "react-router";
import { Button } from "~/components/base/button";
import { Heading } from "~/components/base/heading";
import { Divider } from "~/components/base/divider";
import type { Flashcard } from "~/types/flashcard";
import { Card } from "~/components/base/card";
import { parseFlashcardForm } from "~/helpers/formDataParsers/parseFlashcardForm";
import { generateFlashcards } from "~/operations/generateFlashcards";
import { requireAuthentication } from "~/services/auth.server";

export function meta(): ReturnType<MetaFunction> {
  return [{ title: "CardCrafter - Home" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuthentication(request);
}

export async function action({ request }: Route.ActionArgs) {
  const args = await parseFlashcardForm(request);

  return generateFlashcards(args);
}

export default function Home() {
  const fetcher = useFetcher<Flashcard[]>();
  const busy = fetcher.state !== "idle";

  return (
    <div>
      <div className="mb-4">
        <Heading>Generate more flashcards</Heading>
        <div className="mt-2">
          <Text>Its simple! Upload a picture and get notecards back!</Text>
        </div>
        <Divider className="my-2" />
        <fetcher.Form method="post" encType="multipart/form-data">
          <Text>Select an image to upload...</Text>
          <Input
            className="mb-4"
            required
            type="file"
            name="notes"
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
          <Button
            disabled={busy}
            color="green"
            className="w-full"
            type="submit"
          >
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

      <div className="overflow-x-auto flex gap-3">
        {fetcher.data &&
          fetcher.data.map((d) => (
            <Card question={d.question} answer={d.answer} />
          ))}
      </div>
    </div>
  );
}
