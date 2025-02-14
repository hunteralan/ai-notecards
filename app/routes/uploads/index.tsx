import { requireAuthentication } from "~/services/auth.server";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import type { Route } from "./+types";
import { useLoaderData } from "react-router";
import { Notecard } from "~/components/extensions/notecard";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  const prisma = getPrismaClient();

  const upload = await prisma.uploadGroup.findUnique({
    where: {
      id: parseInt(params.uploadId),
    },
    include: {
      noteCards: true,
    },
  });

  return upload;
}

export default function Index() {
  const upload = useLoaderData<typeof loader>();
  return (
    <div className="flex gap-4 flex-wrap">
      {upload?.noteCards.map((n) => (
        <Notecard key={n.id} question={n.question!} answer={n.answer!} />
      ))}
    </div>
  );
}
