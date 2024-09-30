import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number; 
    nomeCompleto: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string; 
      nomeCompleto: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; 
    nomeCompleto: string;
  }
}
