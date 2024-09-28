// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: number; // Continua como número, pois vem do banco de dados
    nomeCompleto: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string; // Agora é string na sessão
      nomeCompleto: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Agora é string no token
    nomeCompleto: string;
  }
}
