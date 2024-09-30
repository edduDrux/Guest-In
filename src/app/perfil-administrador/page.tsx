"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router"; 

// Define a interface para o objeto Funcionario
interface Funcionario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
}

// Função para buscar os funcionários da API
const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function PerfilAdministrador() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: funcionarios, error, mutate } = useSWR(
    "/api/funcionarios",
    fetcher
  );

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null); // Adicionado para edição
  const [errorMessage, setErrorMessage] = useState(""); // Estado para erros no cadastro
  const [deleteMessage, setDeleteMessage] = useState(""); // Estado para mensagem ao deletar

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login"); // Redireciona para a página de login se não autenticado
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!nome || !email || !telefone || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    // Validação de e-mail simples
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/funcionarios?id=${editingId}` : "/api/funcionarios";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        mutate(); // Atualiza a lista de funcionários após o cadastro
        setNome("");
        setEmail("");
        setTelefone("");
        setSenha("");
        setErrorMessage(""); // Limpa mensagem de erro se bem-sucedido
        setEditingId(null); // Resetar o ID após edição
      } else {
        setErrorMessage(data.error || "Erro ao cadastrar funcionário.");
      }
    } catch (error) {
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  };

  const handleEdit = (funcionario: Funcionario) => {
    setNome(funcionario.nome);
    setEmail(funcionario.email);
    setTelefone(funcionario.telefone || "");
    setEditingId(funcionario.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/funcionarios?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate(); // Atualiza a lista após a remoção
        setDeleteMessage("Funcionário removido com sucesso.");
      } else {
        setDeleteMessage("Erro ao remover funcionário.");
      }
    } catch (error) {
      setDeleteMessage("Erro de rede ao remover funcionário.");
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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Editar Funcionário" : "Cadastrar Novo Funcionário"}
        </h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingId ? "Salvar Alterações" : "Cadastrar Funcionário"}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Funcionários Cadastrados</h2>
        {deleteMessage && <p className="text-green-500 mb-4">{deleteMessage}</p>}
        {error && <p className="text-red-500">Erro ao carregar funcionários</p>}
        {!funcionarios ? (
          <p>Carregando funcionários...</p>
        ) : (
          <ul>
            {funcionarios.map((funcionario: Funcionario) => (
              <li key={funcionario.id} className="mb-2">
                {funcionario.nome} - {funcionario.email}
                <button
                  onClick={() => handleEdit(funcionario)}
                  className="ml-4 bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(funcionario.id)}
                  className="ml-4 bg-red-500 text-white py-1 px-2 rounded"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
