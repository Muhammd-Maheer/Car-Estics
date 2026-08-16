import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      try {
        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email });

        if (user) {
         
          // add any more fields you want
        } else {
             }
      } catch (error) {
        console.error("Error refreshing session:", error);
      }

      return session;
    },

    async jwt({ token, user }) {
      // initial sign-in
      if (user) {
    
      }
      return token;
    },
  },
};
