"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroImovel() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeImovel: '',
    tipoPropriedade: 'Residencial',
    endereco: '',
    tamanho: '',
    proprietarioId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Imóvel cadastrado com sucesso!');
        router.push('/perfil-administrador');
      } else {
        alert('Erro ao cadastrar o imóvel.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o imóvel:', error);
      alert('Erro ao cadastrar o imóvel.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Imóvel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nome do Imóvel</label>
          <input
            type="text"
            name="nomeImovel"
            value={formData.nomeImovel}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Tipo de Propriedade</label>
          <select
            name="tipoPropriedade"
            value={formData.tipoPropriedade}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>
        <div>
          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Tamanho</label>
          <input
            type="text"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Cadastrar Imóvel
        </button>
      </form>
    </div>
  );
}
