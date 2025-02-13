import type OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import getOpenAiClient from "~/helpers/getOpenAIClient";
import type { CreateFlashcardArgs } from "~/types/createFlashcardArgs";
import type { Flashcard } from "~/types/flashcard";
import { flashcard } from "~/validators/flashcards";

export async function generateFlashcards({
  notes,
  numCards,
  subject,
}: CreateFlashcardArgs) {
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

  const client = getOpenAiClient();
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

  return flashcards.cards;
}
