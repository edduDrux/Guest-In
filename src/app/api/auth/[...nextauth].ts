import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

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
        console.log("Tentativa de login com:", credentials);

        if (!credentials?.email || !credentials.password) {
          throw new Error("Por favor, preencha ambos os campos.");
        }

        // Busca o usuário pelo e-mail
        const user = await prisma.proprietario.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("Nenhum usuário encontrado.");
          throw new Error("Nenhum usuário encontrado com este e-mail.");
        }

        // Compara a senha diretamente (sem hash)
        if (credentials.password.trim() !== user.senha.trim()) {
          console.log("Senha incorreta.");
          throw new Error("Senha incorreta.");
        }

        console.log("Login bem-sucedido:", user);
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
    error: "/login?error=true", // Redireciona para a página de login com um erro
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
  debug: true, // Habilita o modo de depuração
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
