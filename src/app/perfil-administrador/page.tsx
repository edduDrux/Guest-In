"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUserPlus, FiHome, FiUser, FiEye } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Modal de Cadastro de Funcionário
function CadastroFuncionarioModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/funcionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Funcionário cadastrado com sucesso!');
        onClose();
      } else {
        alert('Erro ao cadastrar o funcionário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o funcionário:', error);
      alert('Erro ao cadastrar o funcionário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold focus:outline-none focus:ring-2 ring-red-300"
        >
          X
        </button>
        <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">Cadastro de Funcionário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Digite o nome completo"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Digite o e-mail"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Digite o telefone"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Digite a senha"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700 transform transition focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : (
              "Cadastrar Funcionário"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Modal de Cadastro de Inquilino
function CadastroInquilinoModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    senha: '', // A senha não será necessária, pois será gerada automaticamente
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados do inquilino enviados:", formData); // Log dos dados enviados para depuração

    try {
      const response = await fetch('/api/inquilinos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Envia os dados do inquilino para o backend
      });

      if (response.ok) {
        alert('Inquilino cadastrado com sucesso!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar o inquilino: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar o inquilino:', error);
      alert('Erro ao cadastrar o inquilino.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
        <h1 className="text-2xl font-bold mb-4">Cadastro de Inquilino</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Cadastrar Inquilino
          </button>
        </form>
      </div>
    </div>
  );
}


function CadastroImovelModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    nomeImovel: '',
    tipoPropriedade: 'Residencial',
    endereco: '',
    tamanho: '',
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
    console.log("Dados do imóvel enviados:", formData); // Log dos dados

    try {
      const response = await fetch('/api/imoveis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Imóvel cadastrado com sucesso!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar o imóvel: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar o imóvel:', error);
      alert('Erro ao cadastrar o imóvel.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
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
    </div>
  );
}


export default function PerfilAdministrador() {
  const [isFuncionarioModalOpen, setFuncionarioModalOpen] = useState(false);
  const [isInquilinoModalOpen, setInquilinoModalOpen] = useState(false);
  const [isImovelModalOpen, setImovelModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 text-black">
      <div className="bg-white shadow-xl rounded-lg p-8 animate-fadeInUp">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center border-b pb-4">
          Perfil do Administrador
        </h1>

        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <button
              onClick={() => setInquilinoModalOpen(true)}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center"
            >
              <FiUserPlus className="mr-2" /> Cadastrar Inquilino
            </button>
            <button
              onClick={() => setImovelModalOpen(true)}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
            >
              <FiHome className="mr-2" /> Cadastrar Imóvel
            </button>
            <button
              onClick={() => setFuncionarioModalOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center"
            >
              <FiUser className="mr-2" /> Cadastrar Funcionário
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
            <button
              onClick={() => router.push('/inquilinos')}
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center"
            >
              <FiEye className="mr-2" /> Visualizar Inquilinos
            </button>
            <button
              onClick={() => router.push('/imoveis')}
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300 flex items-center justify-center"
            >
              <FiEye className="mr-2" /> Visualizar Imóveis
            </button>
          </div>
        </section>
      </div>

      {/* Modais */}
      {isFuncionarioModalOpen && (
        <CadastroFuncionarioModal onClose={() => setFuncionarioModalOpen(false)} />
      )}
      {isInquilinoModalOpen && (
        <CadastroInquilinoModal onClose={() => setInquilinoModalOpen(false)} />
      )}
      {isImovelModalOpen && (
        <CadastroImovelModal onClose={() => setImovelModalOpen(false)} />
      )}
    </div>
  );
}
