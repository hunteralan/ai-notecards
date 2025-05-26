import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/base/table";
import { requireAuthentication } from "~/services/auth.server";
import { useLoaderData } from "react-router";
import { Button } from "~/components/base/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Route } from "./+types";
import { NewClassModal } from "~/components/extensions/newClassModal";
import { useState } from "react";
import { getClassesByUserId } from "~/operations/getClassesByUserId";
import { Text } from "~/components/base/text";
import { Breadcrumbs } from "~/components/base/breadcrumbs";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuthentication(request);
  const classes = await getClassesByUserId(user.id);

  return { classes };
}

export default function Index() {
  const { classes } = useLoaderData<typeof loader>();
  const [creatingNewClass, setCreatingNewClassOpen] = useState(false);

  return (
    <div>
      <Breadcrumbs
        pages={[{ current: true, href: "/classes", name: "Classes" }]}
        className="mb-4"
      />
      <div className="flex items-center justify-end mb-4">
        <Button
          onClick={() => setCreatingNewClassOpen(true)}
          className="flex gap-1"
          color="green"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Class
        </Button>
      </div>
      {classes.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Class Name</TableHeader>
              <TableHeader className="max-md:hidden"># of Uploads</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.className}</TableCell>
                <TableCell className="max-md:hidden">
                  {c._count.uploadGroup}
                </TableCell>
                <TableCell align="right">
                  <Button color="blue" href={`/classes/${c.id}`}>
                    Go to class
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text>There are no classes...</Text>
      )}

      <NewClassModal
        open={creatingNewClass}
        onClose={() => setCreatingNewClassOpen(false)}
      />
    </div>
  );
}
