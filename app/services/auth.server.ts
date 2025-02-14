import { Authenticator } from "remix-auth";
import { OAuth2Strategy, CodeChallengeMethod } from "remix-auth-oauth2";
import { Provider } from "~/constants/providers";
import type { User } from "@prisma/client";
import { signIn } from "~/operations/signIn";
import { getUserFromSession } from "./session.server";
import { redirect } from "react-router";

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: "oauth2", // Optional, can also be an object with more options

      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      redirectURI: `${process.env.DEPLOYMENT_URL}/auth/callback`,

      scopes: ["openid", "email", "profile"], // optional
      codeChallengeMethod: CodeChallengeMethod.S256, // optional
    },
    signIn
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  Provider.GOOGLE
);

export async function requireAuthentication(request: Request): Promise<User> {
  const user = await getUserFromSession(request);
  if (!user) {
    throw redirect("/auth/signIn");
  }
  return user;
}
