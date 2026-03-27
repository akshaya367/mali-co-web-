import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a mock authorize for demo purposes
        if (credentials?.email === "admin@malai.co" && credentials?.password === "admin") {
          return { id: "1", name: "Malai Admin", email: "admin@malai.co" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
