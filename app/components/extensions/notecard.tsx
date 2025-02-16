import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from "react";
import { Strong, Text } from "../base/text";
import { motion } from "motion/react";

type Props = {
  question: string;
  answer: string;
};
export type NotecardRef = {
  flipcard: () => void;
  isFlipped: boolean;
};

function NotecardComponent(
  { answer, question }: Props,
  ref: ForwardedRef<NotecardRef>
) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipcard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      flipcard,
      isFlipped,
    }),
    [flipcard, isFlipped]
  );

  return (
    <motion.div
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={flipcard}
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

export const Notecard = forwardRef<NotecardRef, Props>((props, ref) =>
  NotecardComponent(props, ref)
);
