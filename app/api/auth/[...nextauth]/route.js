import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          let userExists = await User.findOne({ email });

          if (!userExists) {
            // If user doesn't exist, create a new instance of User model
            const newUser = new User({
              name,
              email,
            });
            // Save the new user to the database
            userExists = await newUser.save();
          }

          // Set the user.id to the user's MongoDB _id
          user.id = userExists._id;

          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }

      return true;
    },
    // This callback is called whenever a JWT is created or updated.
    // The `user` object is passed during the initial sign-in.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    // The `token` object is passed and contains data from the JWT.
    async session({ session, token }) {
      if (token?.id) {                   
        session.user.id = token.id;      // Add user ID from the token to the session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
