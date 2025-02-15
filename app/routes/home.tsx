import type { Route } from "./+types/home";
import { redirect, type MetaFunction } from "react-router";
import { requireAuthentication } from "~/services/auth.server";

export function meta(): ReturnType<MetaFunction> {
  return [{ title: "CardCrafter - Home" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuthentication(request);

  return redirect("/classes");
}

export default function Home() {
  return <div>Home</div>;
}
