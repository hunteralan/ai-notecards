import OpenAI from "openai";

export default function getOpenAiClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}
