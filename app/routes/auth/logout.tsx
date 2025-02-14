import {
  destroySession,
  getSessionFromRequest,
} from "~/services/session.server";
import type { Route } from "./+types";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSessionFromRequest(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
