import { requireAuthentication } from "~/services/auth.server";
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
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs } from "~/components/base/breadcrumbs";
import { getClassDetailsById } from "~/operations/getClassDetailsById";
import type { Route } from "./+types/viewClass";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);

  const classDetails = await getClassDetailsById(
    parseInt(params.classId!),
    user.id
  );

  if (!classDetails) {
    return redirect("/classes");
  }

  return classDetails;
}

export default function ViewClass() {
  const classDetails = useLoaderData<typeof loader>();
  return (
    <div>
      <Breadcrumbs
        pages={[
          { current: false, href: "/classes", name: "Classes" },
          {
            current: true,
            href: `/classes/${classDetails.id}`,
            name: classDetails.className,
          },
        ]}
        className="mb-4"
      />
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
      {classDetails?.uploadGroup.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader className="max-md:hidden">
                # of attachments
              </TableHeader>
              <TableHeader className="max-md:hidden">
                # of Notecards
              </TableHeader>
              <TableHeader className="max-md:hidden">Uploaded At</TableHeader>
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {classDetails.uploadGroup.map((ug) => (
              <TableRow key={ug.id}>
                <TableCell>{ug.name}</TableCell>
                <TableCell className="max-md:hidden">
                  {ug._count.files}
                </TableCell>
                <TableCell className="max-md:hidden">
                  {ug._count.noteCards}
                </TableCell>
                <TableCell className="max-md:hidden">
                  {ug.createdAt.toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Button color="blue" href={`/uploads/${ug.id}`}>
                    Go to upload
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
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
