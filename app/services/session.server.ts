import type { User } from "@prisma/client";
import { createCookie, createCookieSessionStorage } from "react-router";

type SessionData = {
  user: User;
};

type SessionFlashData = {
  error: string;
};

const cookieSecret =
  process.env.NODE_ENV === "production"
    ? process.env.COOKIE_SECRET
    : "developmentSecret";

if (!cookieSecret) {
  throw new Error("You have not provided a cookie secret!");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: createCookie("user_session", {
      secrets: [cookieSecret],
    }),
  });

export { getSession, commitSession, destroySession };

export async function getSessionFromRequest(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return session;
}

export async function getUserFromSession(request: Request) {
  const session = await getSessionFromRequest(request);
  const user = session.get("user");

  return user;
}
