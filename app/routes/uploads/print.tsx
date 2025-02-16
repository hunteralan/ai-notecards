import { requireAuthentication } from "~/services/auth.server";
import type { Route } from "./+types";
import { getUploadGroupbyId } from "~/operations/getUploadGroupById";
import { useLoaderData } from "react-router";
import { useLayoutEffect } from "react";
import { PrintButton } from "~/components/extensions/printButton";
import { Text } from "~/components/base/text";
import { Breadcrumbs } from "~/components/base/breadcrumbs";

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

  // Get number of pages needed for 12 notecards per page
  const numPages = Math.ceil(upload.noteCards.length / 12);

  const pageArray: number[] = Array(numPages)
    .fill(0)
    .map((_, index) => index);
  const typeArray: ["question", "answer"] = ["question", "answer"];

  const notecardClassName =
    "border text-xs text-center flex flex-col items-center justify-center";

  return (
    <>
      {pageArray.map((currentPage) =>
        typeArray.map((type) => (
          <div
            key={currentPage}
            className="print:grid w-[10in] h-[7.5in] hidden grid-cols-3 grid-rows-4 break-inside-avoid"
          >
            {upload.noteCards
              .slice(currentPage * 12, currentPage * 12 + 12)
              .map((nc) =>
                type === "question" ? (
                  <div className={notecardClassName} key={nc.question}>
                    <strong>Question</strong>
                    <p>{nc.question}</p>
                  </div>
                ) : (
                  <div className={notecardClassName} key={nc.answer}>
                    <strong>Answer</strong>
                    <p>{nc.answer}</p>
                  </div>
                )
              )}
          </div>
        ))
      )}
      <>
        <Breadcrumbs
          pages={[
            { current: false, href: "/classes", name: "Classes" },
            {
              current: false,
              href: `/classes/${upload?.classId}`,
              name: upload?.class.className ?? "",
            },
            {
              current: false,
              href: `/uploads/${upload?.id}`,
              name: `${upload?.name}`,
            },
            {
              current: true,
              href: `/uploads/${upload?.id}`,
              name: `Print ${upload?.name}`,
            },
          ]}
          className="mb-4 print:hidden"
        />
        <div className="print:hidden flex flex-col items-center text-center bg-green-700/20 border border-green-800 rounded p-4">
          <Text className="">
            The print window should open automatically. If it does not, click
            below.
          </Text>
          <Text className="mb-4">
            You can also safely exit out of this tab and you will resume where
            you left off!
          </Text>
          <div>
            <PrintButton title="Print" />
          </div>
        </div>
      </>
    </>
  );
}
