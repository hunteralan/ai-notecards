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
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setCreatingNewClassOpen(true)}
          className="flex gap-1 px-8!"
          color="green"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Class
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableHeader>Class Name</TableHeader>
          <TableHeader align="right">Actions</TableHeader>
        </TableHead>
        <TableBody>
          {classes.map((c) => (
            <TableRow>
              <TableCell>{c.className}</TableCell>
              <TableCell align="right">
                <Button color="blue">
                  Go to class
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewClassModal
        open={creatingNewClass}
        onClose={() => setCreatingNewClassOpen(false)}
      />
    </div>
  );
}
