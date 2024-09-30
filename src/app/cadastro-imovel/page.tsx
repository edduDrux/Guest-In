"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Proprietario {
  id: number;
  nomeCompleto: string;
}

export default function CadastroImovel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [nomeImovel, setNomeImovel] = useState("");
  const [tipoPropriedade, setTipoPropriedade] = useState("Residencial");
  const [endereco, setEndereco] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [proprietarioId, setProprietarioId] = useState<number | null>(null);
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  // Buscar proprietários disponíveis
  useEffect(() => {
    const fetchProprietarios = async () => {
      try {
        const response = await fetch("/api/proprietarios");
        const data = await response.json();
        setProprietarios(data);
      } catch (error) {
        console.error("Erro ao buscar proprietários", error);
      }
    };

    fetchProprietarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações básicas
    if (!nomeImovel || !endereco || !tamanho || !proprietarioId) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("/api/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeImovel,
          tipoPropriedade,
          endereco,
          tamanho,
          proprietarioId,
        }),
      });

      if (response.ok) {
        // Limpar o formulário
        setNomeImovel("");
        setTipoPropriedade("Residencial");
        setEndereco("");
        setTamanho("");
        setProprietarioId(null);
        setErrorMessage("");
        alert("Imóvel cadastrado com sucesso!");
      } else {
        setErrorMessage("Erro ao cadastrar imóvel. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cadastrar Novo Imóvel</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Nome do Imóvel</label>
          <input
            type="text"
            value={nomeImovel}
            onChange={(e) => setNomeImovel(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Tipo de Propriedade</label>
          <select
            value={tipoPropriedade}
            onChange={(e) => setTipoPropriedade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Tamanho (m²)</label>
          <input
            type="text"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Proprietário Vinculado</label>
          <select
            value={proprietarioId || ""}
            onChange={(e) => setProprietarioId(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione o proprietário</option>
            {proprietarios.map((proprietario) => (
              <option key={proprietario.id} value={proprietario.id}>
                {proprietario.nomeCompleto}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cadastrar Imóvel
        </button>
      </form>
    </div>
  );
}
