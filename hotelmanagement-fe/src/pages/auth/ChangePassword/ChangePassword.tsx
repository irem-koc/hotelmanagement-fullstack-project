import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useChangePasswordMutation } from "../../../services/users";

type Props = {};

const ChangePassword: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const [passwordChange, setPasswordChange] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword(passwordChange)
      .unwrap()
      .then((result) => {
        if (result.statusCode === 200) {
          navigate("/auth/login");
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChange((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="mt-16">
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Şifre Değiştir
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-posta <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={passwordChange.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Mevcut Şifre <span className="text-red-500">*</span>
              </label>
              <input
                name="currentPassword"
                type="password"
                id="currentPassword"
                value={passwordChange.currentPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mevcut şifrenizi giriniz"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Yeni Şifre <span className="text-red-500">*</span>
              </label>
              <input
                name="newPassword"
                type="password"
                id="newPassword"
                value={passwordChange.newPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Yeni şifrenizi giriniz"
              />
            </div>
            <div>
              <label
                htmlFor="newPasswordCheck"
                className="block text-sm font-medium text-gray-700"
              >
                Yeni Şifreyi Onayla <span className="text-red-500">*</span>
              </label>
              <input
                name="newPasswordCheck"
                type="password"
                id="newPasswordCheck"
                value={passwordChange.newPasswordCheck}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Yeni şifrenizi tekrar giriniz"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Şifre Değiştir
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
