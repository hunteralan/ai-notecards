import { Authenticator } from "remix-auth";
import { OAuth2Strategy, CodeChallengeMethod } from "remix-auth-oauth2";
import { Provider } from "~/constants/providers";
import { decode } from "jsonwebtoken";
import type { User } from "@prisma/client";
import type { GoogleIdToken } from "~/types/googleIdToken";
import { getPrismaClient } from "~/helpers/getPrismaClient";

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
    async ({ tokens, request }) => {
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you

      const idToken = tokens.idToken();
      const decodedToken = decode(idToken) as GoogleIdToken;

      const prisma = getPrismaClient();

      let user = await prisma.user.findUnique({
        where: { email: decodedToken.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
            familyName: decodedToken.family_name,
            givenName: decodedToken.given_name,
            picture: decodedToken.picture,
          },
        });
      }

      return user;
    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  Provider.GOOGLE
);
