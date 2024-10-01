"use client"; // Adiciona a diretiva para Client Component

import { useState, useEffect } from 'react'; // Importar useState e useEffect do React
import { useRouter } from 'next/navigation'; // Usando o novo `useRouter` do App Router

type Imovel = {
  id: number;
  nomeImovel: string;
  tipoPropriedade: string;
  endereco: string;
  tamanho: string;
};

async function fetchImoveis() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/imoveis`, {
    cache: 'no-store', // Garantir que estamos sempre pegando dados atualizados
  });

  if (!response.ok) {
    throw new Error('Failed to fetch imóveis');
  }

  return response.json();
}

export default function ImoveisPage() {
  const router = useRouter();

  // Fetching de dados dentro de um useEffect para evitar problemas com SSR
  const [imoveis, setImoveis] = useState<Imovel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImoveis();
      setImoveis(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">Imóveis Cadastrados</h1>

      {imoveis.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum imóvel cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imoveis.map((imovel) => (
            <div key={imovel.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-2">{imovel.nomeImovel}</h2>
              <p className="text-sm text-gray-700"><strong>Tipo:</strong> {imovel.tipoPropriedade}</p>
              <p className="text-sm text-gray-700"><strong>Endereço:</strong> {imovel.endereco}</p>
              <p className="text-sm text-gray-700"><strong>Tamanho:</strong> {imovel.tamanho}</p>
              <button
                onClick={() => router.push(`/imoveis/${imovel.id}`)}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
