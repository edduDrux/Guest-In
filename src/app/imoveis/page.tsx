"use client"; // Diretiva para Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Imovel = {
  id: number;
  nomeImovel: string;
  tipoPropriedade: string;
  endereco: string;
  tamanho: string;
};

async function fetchImoveis() {
  try {
    // Fazer a requisição para a API que criamos
    const response = await fetch('/api/imoveis', {
      cache: 'no-store', // Garantir que estamos sempre pegando dados atualizados
    });

    if (!response.ok) {
      throw new Error('Failed to fetch imóveis');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
}

export default function ImoveisPage() {
  const router = useRouter();

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [error, setError] = useState<string | null>(null); // Adicionar um estado para erro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchImoveis();
        setImoveis(data); // Atualiza o estado com os dados dos imóveis
      } catch (err) {
        console.error("Erro ao buscar imóveis:", err);
        setError("Erro ao carregar imóveis. Por favor, tente novamente.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">Imóveis Cadastrados</h1>

      {error ? (
        <p className="text-center text-red-500">{error}</p> // Exibir mensagem de erro, se houver
      ) : imoveis.length === 0 ? (
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
