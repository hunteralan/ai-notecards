import { Text } from "~/components/text";
import type { Route } from "./+types/home";
import { Input } from "~/components/input";
import { Form, useFetcher } from "react-router";
import { Button } from "~/components/button";
import {
  FileUpload,
  parseFormData,
  type FileUploadHandler,
} from "@mjackson/form-data-parser";
import { StackedLayout } from "~/components/stacked-layout";
import { Heading } from "~/components/heading";
import { Divider } from "~/components/divider";
import { fileUploadHandler } from "~/helpers/fileUploadHandler";
import getOpenAiClient from "~/helpers/getOpenAIClient";
import OpenAI from "openai";
import { Label } from "~/components/fieldset";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import type { Flashcard } from "~/types/flashcard";
import { Card } from "~/components/card";
import { Navbar, NavbarItem } from "~/components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const flashcard = z.object({
  cards: z.array(z.object({ question: z.string(), answer: z.string() })),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await parseFormData(request, fileUploadHandler);

  const client = getOpenAiClient();
  const numCards = formData.get("numCards");
  const subject = formData.get("subject");
  const notes = formData.getAll("notes");

  const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    {
      type: "text",
      text: `What I need: ${numCards} flashcards based on the most important information contained within the photo.
      Subject: ${subject}
      `,
    },
  ];

  for (const note of notes) {
    content.push({
      type: "image_url",
      image_url: { url: note.toString() },
    });
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    store: true,
    response_format: zodResponseFormat(flashcard, "flashcard"),
  });

  const unparsedCards = response.choices[0].message.content;

  if (!unparsedCards) {
    return [];
  }

  const flashcards: { cards: Flashcard[] } = JSON.parse(unparsedCards);

  console.log(flashcards.cards);

  return flashcards.cards;
}

export default function Home() {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <NavbarItem href="/">Home</NavbarItem>
          <NavbarItem href="/me/notecards">Your Notecards</NavbarItem>
          <NavbarItem href="/me/classes">Your Classes</NavbarItem>
        </Navbar>
      }
      sidebar={<></>}
    >
      <div className="mb-4">
        <Heading>Notecard Generator</Heading>
        <div className="mt-2">
          <Text>Its simple! Upload a picture and get notecards back!</Text>
        </div>
        <Divider className="my-2" />
        <Text>Class Subject</Text>
        <Input
          required
          type="text"
          minLength={3}
          name="subject"
          placeholder="Enter subject..."
          className="mb-4"
        />
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
          fetcher.data.map((d: Flashcard) => (
            <Card question={d.question} answer={d.answer} />
          ))}
      </div>
    </StackedLayout>
  );
}
