import type OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import getOpenAiClient from "~/helpers/getOpenAIClient";
import type { Flashcard } from "~/types/flashcard";
import { flashcards as flashcardsSchema } from "~/schemas/flashcards";
import { getFileDataUrl } from "~/helpers/getFileDataUrl";

export async function generateFlashcardRespone(
  numCards: number,
  files: File[]
) {
  const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    {
      type: "text",
      text: `I need ${numCards} flashcards based on the most important information contained within the photo.`,
    },
  ];

  for (const file of files) {
    content.push({
      type: "image_url",
      image_url: { url: await getFileDataUrl(file) },
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
    response_format: zodResponseFormat(flashcardsSchema, "flashcard"),
  });

  const unparsedCards = response.choices[0].message.content;

  if (!unparsedCards) {
    return [];
  }

  const flashcards: { cards: Flashcard[] } = JSON.parse(unparsedCards);

  return flashcards.cards;
}
