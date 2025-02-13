import { useState } from "react";
import type { Flashcard } from "~/types/flashcard";
import { Text } from "./text";

export function Card({ answer, question }: Flashcard) {
  const [showingAnswer, setShowingAnswer] = useState(false);
  return (
    <div
      className="border rounded bg-white"
      onClick={() => setShowingAnswer((prev) => !prev)}
    >
      <Text>
        {showingAnswer ? `Answer: ${answer}` : `Question: ${question}`}
      </Text>
    </div>
  );
}
