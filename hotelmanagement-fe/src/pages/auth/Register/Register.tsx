import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../../services/users";

type Props = {
  email: string;
  name?: string;
  phoneNumber: string;
  password?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
  });
  const handleChangeUser = async (e: any) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleRegister = async (e: any) => {
    e.preventDefault();
    await registerUser(user);
    navigate("/auth/login");
  };
  return (
    <div className="flex flex-col mt-10">
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Yeni Kullanıcı Kaydı
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
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
                value={user.email}
                onChange={handleChangeUser}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChangeUser}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Adınızı ve soyadınızı giriniz"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Telefon Numarası <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={user.phoneNumber}
                onChange={handleChangeUser}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Telefon numaranızı giriniz"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                required
                minLength={5}
                onChange={handleChangeUser}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Şifrenizi giriniz"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
