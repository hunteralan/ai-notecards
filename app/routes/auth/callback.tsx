import { authenticator } from "~/services/auth.server";
import { Provider } from "~/constants/providers";
import { redirect } from "react-router";
import { commitSession, getSession } from "~/services/session.server";
import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await authenticator.authenticate(Provider.GOOGLE, request);

  const session = await getSession();
  session.set("user", user);

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
