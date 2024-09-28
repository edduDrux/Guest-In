// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Por favor, preencha ambos os campos.");
        }

        const user = await prisma.proprietario.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Nenhum usuário encontrado com este e-mail.");
        }

        const isValidPassword = await compare(credentials.password, user.senha);

        if (!isValidPassword) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: user.id,
          nomeCompleto: user.nomeCompleto,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id); // Converte o ID para string
        token.nomeCompleto = user.nomeCompleto;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id; // token.id é string
        session.user.nomeCompleto = token.nomeCompleto;
      }
      return session;
    },
  },
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
