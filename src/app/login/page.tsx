"use client";

import { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-stone-500 to-stone-400">
      <div className="bg-stone-300 backdrop-blur-lg p-8 rounded-lg shadow-lg w-[600px]">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">User Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              <i className="fa fa-envelope mr-2"></i>Email ID
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              <i className="fa fa-lock mr-2"></i>Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500  text-black"
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div>
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="text-gray-500 hover:text-indigo-600">Cadastre-se</a>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
