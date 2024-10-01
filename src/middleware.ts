// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';  // Importa o tipo NextRequest
import { getToken } from 'next-auth/jwt';

// Middleware para proteger rotas autenticadas
export async function middleware(req: NextRequest) {  // Tipa o req como NextRequest
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se estamos em ambiente de desenvolvimento
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Se for desenvolvimento ou o token existir, permite o acesso
  if (isDevelopment || token) {
    return NextResponse.next();
  }

  // Redireciona para login se não autenticado
  return NextResponse.redirect(new URL('/login', req.url));
}

// O matcher precisa ser estático
export const config = {
  matcher: ['/perfil-administrador/:path*', '/cadastro-inquilino/:path*', '/cadastro-imovel/:path*'],
};
