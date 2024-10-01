"use client";

import { useRouter } from 'next/navigation';

export default function PerfilAdministrador() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil do Administrador</h1>

      {/* Redirecionar para páginas de cadastro */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Ações</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            onClick={() => router.push('/cadastro-inquilino')}
            className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600"
          >
            Cadastrar Inquilino
          </button>
          <button
            onClick={() => router.push('/cadastro-imovel')}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Cadastrar Imóvel
          </button>
          <button
            onClick={() => router.push('/cadastro-funcionario')}
            className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600"
          >
            Cadastrar Funcionário
          </button>
        </div>
      </section>
    </div>
  );
}
