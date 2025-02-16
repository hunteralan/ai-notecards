import { requireAuthentication } from "~/services/auth.server";
import type { Route } from "./+types";
import { getUploadGroupbyId } from "~/operations/getUploadGroupById";
import { useLoaderData } from "react-router";
import { useLayoutEffect } from "react";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  return getUploadGroupbyId(parseInt(params.uploadId), user.id);
}

export default function Print() {
  const upload = useLoaderData<typeof loader>();

  useLayoutEffect(() => {
    window.print();
  }, []);

  if (!upload) {
    return <div>This is not a valid upload!</div>;
  }

  // Get number of pages needed for 12 notecards per page and then multiple by 2 (questions and answers)
  const numPages = Math.ceil(upload.noteCards.length / 12);

  const renderArray: number[] = Array(numPages).fill(0);
  const typeArray: ["question", "answer"] = ["question", "answer"];

  return typeArray.map((type) =>
    type === "question"
      ? renderArray.map((_, currentPage) => {
          return (
            <div
              key={currentPage}
              className="w-[10in] h-[7.5in] grid grid-cols-3 grid-rows-4 break-inside-avoid"
            >
              {upload.noteCards
                .slice(currentPage * 12, currentPage * 12 + 12)
                .map((nc) => (
                  <div
                    className="border text-xs text-center flex flex-col items-center justify-center"
                    key={nc.question}
                  >
                    <strong>Question</strong>
                    <p>{nc.question}</p>
                  </div>
                ))}
            </div>
          );
        })
      : renderArray.map((_, currentPage) => {
          return (
            <div
              key={currentPage}
              className="w-[10in] h-[7.5in] grid grid-cols-3 grid-rows-4 break-inside-avoid"
            >
              {upload.noteCards
                .slice(currentPage * 12, currentPage * 12 + 12)
                .map((nc) => (
                  <div
                    className="border text-center text-xs flex flex-col items-center justify-center"
                    key={nc.answer}
                  >
                    <strong>Answer</strong>
                    <p>{nc.answer}</p>
                  </div>
                ))}
            </div>
          );
        })
  );
}
