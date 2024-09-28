"use client";

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiHome, FiMapPin } from 'react-icons/fi';

export default function CadastroProprietario() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    cpf: '',
    cnpj: '',
    nomeImobiliaria: '',
    enderecoImobiliaria: '',
    senha: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const requiredFields = ['nomeCompleto', 'email', 'cpf', 'cnpj', 'senha'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Este campo é obrigatório.';
      }
    });

    if (formData.email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'E-mail inválido.';
      }
    }

    if (formData.cpf) {
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(formData.cpf)) {
        newErrors.cpf = 'CPF deve ter 11 dígitos numéricos.';
      }
    }

    if (formData.cnpj) {
      const cnpjRegex = /^\d{14}$/;
      if (!cnpjRegex.test(formData.cnpj)) {
        newErrors.cnpj = 'CNPJ deve ter 14 dígitos numéricos.';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await fetch('/api/proprietarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao cadastrar.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Cabeçalho */}
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/logo.svg"
            alt="Sua Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            e aproveite todos os benefícios
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
          {/* Nome Completo */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              placeholder="Nome Completo"
              value={formData.nomeCompleto}
              onChange={handleChange}
              className={`block w-full pl-10 pr-4 py-2 border ${errors.nomeCompleto ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.nomeCompleto && <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto}</p>}
          </div>

          {/* E-mail */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Telefone */}
          <div className="relative">
            <FiPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="telefone"
              id="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* CPF */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              className={`block w-full pl-10 pr-4 py-2 border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
          </div>

          {/* CNPJ */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="cnpj"
              id="cnpj"
              placeholder="CNPJ"
              value={formData.cnpj}
              onChange={handleChange}
              className={`block w-full pl-10 pr-4 py-2 border ${errors.cnpj ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
          </div>

          {/* Nome da Imobiliária */}
          <div className="relative">
            <FiHome className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="nomeImobiliaria"
              id="nomeImobiliaria"
              placeholder="Nome da Imobiliária"
              value={formData.nomeImobiliaria}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Endereço da Imobiliária */}
          <div className="relative">
            <FiMapPin className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="enderecoImobiliaria"
              id="enderecoImobiliaria"
              placeholder="Endereço da Imobiliária"
              value={formData.enderecoImobiliaria}
              onChange={handleChange}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className={`block w-full pl-10 pr-4 py-2 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
          </div>

          {/* Botão de Submissão */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
          >
            Criar conta
          </button>
        </form>

        {/* Link para login */}
        <p className="mt-6 text-center text-base text-gray-600">
          Já possui uma conta?{' '}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
