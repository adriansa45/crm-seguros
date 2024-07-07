import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }: any) {
        return {name: "Adrian", id:"1"}
      },
    }),
  ],
})