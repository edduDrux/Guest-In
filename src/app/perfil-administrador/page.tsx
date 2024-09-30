"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation"; // Correção no uso de useRouter

// Interface para o objeto Funcionario
interface Funcionario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
}

// Interface para o objeto Imovel
interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  tipo: string;
}

// Interface para o objeto Inquilino
interface Inquilino {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

// Função para buscar os dados da API
const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function PerfilAdministrador() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Buscar dados dos funcionários e imóveis
  const { data: funcionarios, error: errorFuncionarios, mutate: mutateFuncionarios } = useSWR("/api/funcionarios", fetcher);
  const { data: imoveis, error: errorImoveis, mutate: mutateImoveis } = useSWR("/api/imoveis", fetcher);

  const [inquilino, setInquilino] = useState<Inquilino>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  const [imovelSelecionado, setImovelSelecionado] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para erros no cadastro de inquilino
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagens de sucesso

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleInquilinoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inquilino.nome || !inquilino.email || !inquilino.telefone || !inquilino.cpf || !imovelSelecionado) {
      setErrorMessage("Por favor, preencha todos os campos e selecione um imóvel.");
      return;
    }

    try {
      const response = await fetch("/api/inquilinos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquilino, imovelId: imovelSelecionado }),
      });

      if (response.ok) {
        setSuccessMessage("Inquilino cadastrado com sucesso.");
        setInquilino({ nome: "", email: "", telefone: "", cpf: "" });
        setImovelSelecionado(null);
      } else {
        setErrorMessage("Erro ao cadastrar inquilino.");
      }
    } catch (error) {
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo, {session?.user?.nomeCompleto}</h1>
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Sair
      </button>

      {/* Exibição dos imóveis cadastrados */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Imóveis Cadastrados</h2>
        {errorImoveis && <p className="text-red-500">Erro ao carregar imóveis.</p>}
        {!imoveis ? (
          <p>Carregando imóveis...</p>
        ) : (
          <ul>
            {imoveis.map((imovel: Imovel) => (
              <li key={imovel.id} className="mb-2">
                {imovel.nome} - {imovel.endereco} ({imovel.tipo})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulário de cadastro de inquilinos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Cadastrar Inquilino no Imóvel</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form onSubmit={handleInquilinoSubmit}>
          <div className="mb-4">
            <label>Nome do Inquilino</label>
            <input
              type="text"
              value={inquilino.nome}
              onChange={(e) => setInquilino({ ...inquilino, nome: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>E-mail</label>
            <input
              type="email"
              value={inquilino.email}
              onChange={(e) => setInquilino({ ...inquilino, email: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Telefone</label>
            <input
              type="text"
              value={inquilino.telefone}
              onChange={(e) => setInquilino({ ...inquilino, telefone: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>CPF</label>
            <input
              type="text"
              value={inquilino.cpf}
              onChange={(e) => setInquilino({ ...inquilino, cpf: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Selecione o Imóvel</label>
            <select
              value={imovelSelecionado || ""}
              onChange={(e) => setImovelSelecionado(Number(e.target.value))}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Selecione um imóvel
              </option>
              {imoveis?.map((imovel: Imovel) => (
                <option key={imovel.id} value={imovel.id}>
                  {imovel.nome} - {imovel.endereco}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Cadastrar Inquilino
          </button>
        </form>
      </div>
    </div>
  );
}
