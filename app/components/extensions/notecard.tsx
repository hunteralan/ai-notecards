import { useState } from "react";
import { Strong, Text } from "../base/text";
import { motion } from "motion/react";

type Props = {
  question: string;
  answer: string;
};

export function Notecard({ answer, question }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={() => setIsFlipped((prev) => !prev)}
      style={{ transformStyle: "preserve-3d" }}
      className="h-104 w-200 dark:bg-black/40 rounded-lg flex items-center justify-center flex-col px-10 cursor-pointer"
    >
      <div
        className="absolute w-full h-full flex flex-col px-10 items-center justify-center rounded-xl shadow-lg"
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <Strong>Question</Strong>
        <Text>{question}</Text>
      </div>

      <div
        className="absolute w-full h-full flex flex-col px-10 items-center justify-center rounded-xl shadow-lg"
        style={{
          transform: "rotateY(180deg)", // Initially flipped
          backfaceVisibility: "hidden",
        }}
      >
        <Strong>Answer</Strong>
        <Text>{answer}</Text>
      </div>
    </motion.div>
  );
}
