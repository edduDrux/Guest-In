// src/app/perfil-administrador/page.tsx
"use client";

import { signOut, useSession } from "next-auth/react";

export default function PerfilAdministrador() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return <p>Você não está autenticado.</p>;
  }

  const userId = parseInt(session.user.id); // Converte para número

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Bem-vindo, {session.user.nomeCompleto}
      </h1>
      <p>Seu ID é: {userId}</p>
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Sair
      </button>
      {/* Conteúdo adicional da página */}
    </div>
  );
}
