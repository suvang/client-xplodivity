import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      let cookieToken = cookies().get("token").value;

      cookies().set("token", cookieToken, {
        expires: new Date(token.exp * 1000),
      });

      return session;
    },
    async signIn({ account, profile }) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/userdetails/login`,
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
              email: profile.email,
              fullName: profile.name,
              email_verified: profile.email_verified,
              provider: "google",
              secret: process.env.NEXTAUTH_SECRET,
              tokenExpiry: account.expires_at,
            }),
          }
        );

        const headersCookie = response.headers.getSetCookie();
        console.log("response", response);
        let cookieOptions = headersCookie[0].split("token=")[1].split(";");
        console.log("cookieOptions", cookieOptions);
        // let expires = cookieOptions[2].split("Expires=")[1];
        let sameSite = cookieOptions[4]?.split("SameSite=")[1] ?? "None";

        cookies().set("token", cookieOptions[0], {
          secure: true,
          expires: new Date(account.expires_at * 1000),
          sameSite: sameSite,
        });

        const isUserExist = await response.json();
        console.log("isUserExist", isUserExist);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
