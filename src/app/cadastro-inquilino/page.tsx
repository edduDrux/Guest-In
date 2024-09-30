"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Função para validar CPF
const validarCPF = (cpf: string) => {
  return /^\d{11}$/.test(cpf); // Verifica se o CPF tem 11 dígitos numéricos
};

export default function CadastroInquilino() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações no frontend
    if (!nome || !email || !telefone || !cpf || !dataNascimento) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarCPF(cpf)) {
      setErrorMessage("CPF inválido. Deve ter 11 dígitos numéricos.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("E-mail inválido.");
      return;
    }

    try {
      const response = await fetch("/api/inquilinos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, cpf, dataNascimento }),
      });

      const data = await response.json();

      if (response.ok) {
        setNome("");
        setEmail("");
        setTelefone("");
        setCpf("");
        setDataNascimento("");
        setErrorMessage(""); // Limpa a mensagem de erro se bem-sucedido
        alert("Inquilino cadastrado com sucesso.");
      } else {
        setErrorMessage(data.error || "Erro ao cadastrar inquilino.");
      }
    } catch (error) {
      setErrorMessage("Erro de rede. Tente novamente.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cadastrar Novo Inquilino</h1>
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
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cadastrar Inquilino
        </button>
      </form>
    </div>
  );
}
