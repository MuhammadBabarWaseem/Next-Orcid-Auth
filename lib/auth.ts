import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    {
      id: "orcid",
      name: "ORCID",
      type: "oauth",
      clientId: process.env.ORCID_CLIENT_ID,
      clientSecret: process.env.ORCID_CLIENT_SECRET,
      authorization: {
        url: "https://orcid.org/oauth/authorize",
        params: {
          scope: "/authenticate",
          response_type: "code",
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/orcid",
        },
      },
      token: "https://orcid.org/oauth/token",
      userinfo: {
        url: "https://pub.orcid.org/v3.0/[ORCID]",
        async request({ tokens }) {
          const res = await fetch(
            `https://pub.orcid.org/v3.0/${tokens.orcid}`,
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                Accept: "application/json",
              },
            }
          );
          return await res.json();
        },
      },
      profile(profile) {
        return {
          id: profile["orcid-identifier"].path,
          name:
            profile.person?.name?.["given-names"]?.value +
            " " +
            profile.person?.name?.["family-name"]?.value,
          email: profile.person?.emails?.email?.[0]?.email,
        };
      },
    },
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // Expire in 30 minutes
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      console.log({ token, user });
      if (user) {
        token.user = user;
        if (user.accessToken) {
          token.accessToken = user.accessToken;
        }
      }
      return token;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      console.log({ token, user, session });
      if (token.user) {
        session.user._id = token.user._id;
        session.user.email = token.user.email;
        session.user.name = token.user.userName;
        session.user.image = token.user.imageUrl;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
