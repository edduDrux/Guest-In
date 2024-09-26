"use client";

import { useState } from 'react';

const RegisterOwner = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    cnpj: '',
    realEstateName: '',
    cep: '',
    realEstateAddress: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Para controlar a etapa do formulário

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      let formattedCPF = value.replace(/\D/g, '');
      if (formattedCPF.length > 11) formattedCPF = formattedCPF.slice(0, 11);
      formattedCPF = formattedCPF.replace(/(\d{3})(\d)/, '$1.$2');
      formattedCPF = formattedCPF.replace(/(\d{3})(\d)/, '$1.$2');
      formattedCPF = formattedCPF.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setFormData({ ...formData, cpf: formattedCPF });
    } else if (name === 'cnpj') {
      let formattedCNPJ = value.replace(/\D/g, '');
      if (formattedCNPJ.length > 14) formattedCNPJ = formattedCNPJ.slice(0, 14);
      formattedCNPJ = formattedCNPJ.replace(/^(\d{2})(\d)/, '$1.$2');
      formattedCNPJ = formattedCNPJ.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      formattedCNPJ = formattedCNPJ.replace(/\.(\d{3})(\d)/, '.$1/$2');
      formattedCNPJ = formattedCNPJ.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      setFormData({ ...formData, cnpj: formattedCNPJ });
    } else if (name === 'cep') {
      let formattedCEP = value.replace(/\D/g, '');
      if (formattedCEP.length > 8) formattedCEP = formattedCEP.slice(0, 8);
      formattedCEP = formattedCEP.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
      setFormData({ ...formData, cep: formattedCEP });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    console.log(formData);
    // Lógica de envio para o backend
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-stone-500 to-stone-400">
      <div className="w-[800px] bg-[#f0f0f0] p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          {step === 1 ? "Dados Pessoais" : "Dados da Imobiliária"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-gray-500 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Esconder" : "Mostrar"}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Avançar
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                  CNPJ (Caso tenha)
                </label>
                <input
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="realEstateName" className="block text-sm font-medium text-gray-700">
                  Nome da Imobiliária (Caso tenha)
                </label>
                <input
                  type="text"
                  name="realEstateName"
                  id="realEstateName"
                  value={formData.realEstateName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  id="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="realEstateAddress" className="block text-sm font-medium text-gray-700">
                  Endereço da Imobiliária (Caso tenha)
                </label>
                <input
                  type="text"
                  name="realEstateAddress"
                  id="realEstateAddress"
                  value={formData.realEstateAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-400 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrar
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterOwner;
