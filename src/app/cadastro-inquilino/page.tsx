"use client";

import { useState } from 'react';

const RegisterTenant = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    console.log(formData);
  };

  return (
    <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 animate-fade-in-down">Crie sua conta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700">Nome Completo</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
              placeholder="Digite seu nome completo"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">E-Mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">Telefone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
              placeholder="Digite seu telefone"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="cpf" className="block text-lg font-semibold text-gray-700">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="birthDate" className="block text-lg font-semibold text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Esconder" : "Mostrar"}
              </button>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700">Confirmar Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-600 focus:border-purple-600 transition duration-300"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTenant;
