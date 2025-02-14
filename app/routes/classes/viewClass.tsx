import { requireAuthentication } from "~/services/auth.server";
import type { Route } from "./+types";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import { redirect, useLoaderData } from "react-router";
import { Text } from "~/components/base/text";
import { Divider } from "~/components/base/divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/base/table";
import { Button } from "~/components/base/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  const prisma = getPrismaClient();

  const classDetails = await prisma.class.findFirst({
    where: {
      id: parseInt(params.classId as string),
      userId: user.id,
    },
    include: {
      UploadGroup: {
        include: {
          _count: {
            select: {
              files: true,
              noteCards: true,
            },
          },
        },
      },
    },
  });

  if (!classDetails) {
    return redirect("/classes");
  }

  return classDetails;
}

export default function ViewClass() {
  const classDetails = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Text>Subject</Text>
          <span>{classDetails?.className}</span>
        </div>
        <div>
          <Button
            color="green"
            href={`/classes/${classDetails.id}/createUpload`}
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Upload
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
      {classDetails?.UploadGroup.length ? (
        <Table>
          <TableHead>
            <TableHeader>Name</TableHeader>
            <TableHeader># of attachments</TableHeader>
            <TableHeader># of Notecards</TableHeader>
            <TableHeader>Uploaded At</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableHead>
          <TableBody>
            {classDetails.UploadGroup.map((ug) => (
              <TableRow>
                <TableCell>{ug.name}</TableCell>
                <TableCell>{ug._count.files}</TableCell>
                <TableCell>{ug._count.noteCards}</TableCell>
                <TableCell>{ug.createdAt.toDateString()}</TableCell>
                <TableCell>
                  <Button>Go to upload</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text>There are no uploads associated with this class...</Text>
      )}
    </div>
  );
}
