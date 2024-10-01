"use client";

import { useEffect, useState } from "react";

interface Imovel {
  nomeImovel: string;
  endereco: string;
}

interface Inquilino {
  id: number;
  nome: string;
  imovel: Imovel;
}

export default function ListaInquilinos() {
  const [inquilinos, setInquilinos] = useState<Inquilino[]>([]);

  useEffect(() => {
    // Faz a requisição para a API para buscar os inquilinos
    async function fetchInquilinos() {
      const res = await fetch("/api/inquilinos");
      const data = await res.json();
      setInquilinos(data);
    }

    fetchInquilinos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Inquilinos Cadastrados
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Nome do Inquilino
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Nome do Imóvel
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Endereço do Imóvel
                </th>
              </tr>
            </thead>
            <tbody>
              {inquilinos.map((inquilino) => (
                <tr key={inquilino.id} className="border-b">
                  <td className="px-6 py-4 text-gray-600">
                    {inquilino.nome}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {inquilino.imovel.nomeImovel}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {inquilino.imovel.endereco}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
