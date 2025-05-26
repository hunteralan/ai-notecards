import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import appCss from "./app.css?url";
import { SidebarLayout } from "./components/base/sidebar-layout";
import { Navbar } from "./components/extensions/navbar";
import React, { useEffect } from "react";
import { getUserFromSession } from "./services/session.server";
import { getToast } from "remix-toast";
import { ToastContainer, toast as notify } from "react-toastify";
import toastCss from "react-toastify/dist/ReactToastify.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: appCss },
  { rel: "stylesheet", href: toastCss },
];

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserFromSession(request);
  const { toast, headers } = await getToast(request);

  return data({ toast, user }, { headers });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user, toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      notify(toast.message, { type: toast.type });
    }
  }, [toast]);

  return user ? (
    <SidebarLayout
      navbar={null}
      sidebar={
        <Navbar
          picture={user.picture}
          name={`${user.givenName} ${user.familyName}`}
        />
      }
    >
      <Outlet />
    </SidebarLayout>
  ) : (
    <Outlet />
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
