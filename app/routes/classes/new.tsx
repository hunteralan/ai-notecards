import { redirect } from "react-router";
import type { Route } from "./+types";
import { newClass } from "~/schemas/newClass";
import { parseFormData } from "~/helpers/parseFormData";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import { requireAuthentication } from "~/services/auth.server";

export async function action({ request }: Route.ActionArgs) {
  const user = await requireAuthentication(request);

  const res = await parseFormData(await request.formData(), newClass);
  const prisma = getPrismaClient();

  await prisma.class.create({
    data: {
      className: res.subject,
      userId: user.id,
    },
  });

  return redirect("/classes");
}
