import { requireAuthentication } from "~/services/auth.server";
import type { Route } from "./+types";
import { useLoaderData, useLocation } from "react-router";
import { Notecard, type NotecardRef } from "~/components/extensions/notecard";
import { Breadcrumbs } from "~/components/base/breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Text } from "~/components/base/text";
import { useCallback, useRef, useState } from "react";
import { getUploadGroupbyId } from "~/operations/getUploadGroupById";
import { Tabs } from "~/components/extensions/Tabs";
import { sleep } from "~/helpers/sleep";
import { PrintButton } from "~/components/extensions/printButton";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  return getUploadGroupbyId(parseInt(params.uploadId), user.id);
}

export default function Index() {
  const upload = useLoaderData<typeof loader>();
  const [flashcardNum, setFlashcardNum] = useState(1);
  const ref = useRef<NotecardRef>(null);
  const location = useLocation();

  const currentFlashcard = upload?.noteCards[flashcardNum - 1];

  const handleFlip = useCallback(async (handler: () => void) => {
    const shouldSleep = ref.current?.isFlipped;

    if (shouldSleep) {
      ref.current?.flipcard();
      await sleep(handler, 100);
    }

    handler();
  }, []);

  const goForward = useCallback(async () => {
    handleFlip(() => setFlashcardNum((prev) => prev + 1));
  }, []);

  const goBack = useCallback(async () => {
    handleFlip(() => setFlashcardNum((prev) => prev - 1));
  }, []);

  if (upload?.noteCards.length === 0) {
    return <div>There are no flashcards to display</div>;
  } else if (!currentFlashcard) {
    return <div>Something went seriously wrong displaying flashcards</div>;
  }

  return (
    <div>
      <Breadcrumbs
        pages={[
          { current: false, href: "/classes", name: "Classes" },
          {
            current: false,
            href: `/classes/${upload?.classId}`,
            name: upload?.class.className ?? "",
          },
          {
            current: true,
            href: `/uploads/${upload?.id}`,
            name: `${upload?.name}`,
          },
        ]}
        className="mb-4"
      />
      <div className="items-center justify-between">
        <Tabs
          headerRight={
            <PrintButton
              title="Print Notecards"
              newWindow
              href={`${location.pathname}/print`}
            />
          }
          tabs={[
            {
              name: "Focused",
              children: (
                <>
                  <div className="flex flex-1 justify-between gap-4">
                    <button
                      className=""
                      onClick={goBack}
                      disabled={flashcardNum === 1}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <Notecard
                      ref={ref}
                      question={currentFlashcard.question}
                      answer={currentFlashcard.answer}
                    />
                    <button
                      onClick={goForward}
                      disabled={flashcardNum === upload?.noteCards.length}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <Text>{`Viewing ${flashcardNum} out of ${upload?.noteCards.length}`}</Text>
                  </div>
                </>
              ),
            },
            {
              name: "List",
              children: (
                <div className="flex flex-wrap flex-1 justify-center gap-4">
                  {upload.noteCards.map((nc) => (
                    <Notecard
                      answer={nc.answer}
                      question={nc.question}
                      key={nc.id}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
