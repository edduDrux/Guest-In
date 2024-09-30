export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/perfil-administrador/:path*",
    "/cadastro-inquilino/:path*",
    "/cadastro-imovel/:path*",
  ],
};