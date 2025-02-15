import { requireAuthentication } from "~/services/auth.server";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import type { Route } from "./+types";
import { useLoaderData } from "react-router";
import { Notecard } from "~/components/extensions/notecard";
import { Breadcrumbs } from "~/components/base/breadcrumbs";
import { Button } from "~/components/base/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Text } from "~/components/base/text";
import { Divider } from "~/components/base/divider";
import { useState } from "react";
import { getUploadGroupbyId } from "~/operations/getUploadGroupById";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  return getUploadGroupbyId(parseInt(params.uploadId), user.id);
}

export default function Index() {
  const upload = useLoaderData<typeof loader>();
  const [flashcardNum, setFlashcardNum] = useState(1);

  const currentFlashcard = upload?.noteCards[flashcardNum - 1];

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
      <div>
        <div className="">
          <Button>
            <FontAwesomeIcon icon={faPrint} />
            Print Notecards
          </Button>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-1 justify-between gap-32">
          <button
            className=""
            onClick={() => setFlashcardNum((prev) => prev - 1)}
            disabled={flashcardNum === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="flex-1">
            <Notecard
              question={currentFlashcard.question}
              answer={currentFlashcard.answer}
            />
          </div>
          <button
            onClick={() => setFlashcardNum((prev) => prev + 1)}
            disabled={flashcardNum === upload?.noteCards.length}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="text-center mt-4">
          <Text>{`Viewing ${flashcardNum} out of ${upload?.noteCards.length}`}</Text>
        </div>
      </div>
    </div>
  );
}
