import { decode } from "jsonwebtoken";
import type { OAuth2Strategy } from "remix-auth-oauth2";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import type { GoogleIdToken } from "~/types/googleIdToken";

export async function signIn({ tokens }: OAuth2Strategy.VerifyOptions) {
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
