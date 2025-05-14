import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../../../lib/db/users";
import dbConnect from "../../../lib/db/mongoose";

// Ensure database connection before NextAuth initialization
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Ensure database connection is established
          await dbConnect();
          
          // Find user in the database
          const user = await findUserByEmail(credentials.email);
          
          if (!user) {
            return null;
          }
          
          // Check if email is verified
          if (!user.isVerified) {
            throw new Error("EmailNotVerified");
          }
          
          // Verify password
          const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);
          
          if (!passwordMatch) {
            return null;
          }
          
          // Return user object without the password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username || user.name,
            role: user.role || "user",
            isVerified: user.isVerified
          };
        } catch (error) {
          console.error("Auth error:", error);
          if (error.message === "EmailNotVerified") {
            throw new Error("EmailNotVerified");
          }
          return null;
        }
      }
    }),
    // You can add more providers here if needed
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }
      
      // Database connection may be needed here for token validation
      // or additional user data retrieval in the future
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  
  // Adding event handlers with database connection
  events: {
    async signIn({ user }) {
      // Connect to database when user signs in
      await dbConnect();
      // You could update last login time here
    },
    async createUser({ user }) {
      // Ensure DB connection when a user is created via OAuth
      await dbConnect();
    },
    async session({ session }) {
      // Connect to DB when session is checked
      await dbConnect();
    }
  },
  };
  
  // Initialize database connection before exporting NextAuth
  export default async function auth(req, res) {
  // Ensure connection to database is established first
  await dbConnect();
  return NextAuth(req, res, authOptions);
  }
