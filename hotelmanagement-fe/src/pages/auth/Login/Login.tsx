import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { saveUserLoggedIn } from "../../../features/users/userSlice";
import { useAppDispatch } from "../../../hooks/hook";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../hooks/localStorage";
import { useLoginUserMutation } from "../../../services/users";

const Login = () => {
  const username = getFromLocalStorage("user")?.email;
  const isRememberMe = getFromLocalStorage("isRememberMe");

  const [user, setUser] = useState({
    email: isRememberMe ? username : "",
    password: "",
    rememberMe: isRememberMe ?? false,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: name === "rememberMe" ? !user.rememberMe : value,
    }));
  };

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    let response = await loginUser({
      email: user.email,
      password: user.password,
    }).unwrap();
    const result = {
      id: response.user.id,
      email: response.user.email,
      username: response.user.name,
      role: response.user.role,
      token: response.token,
      password: response.password,
    };
    dispatch(saveUserLoggedIn(result));
    saveToLocalStorage("user", result);
    saveToLocalStorage("isRememberMe", user.rememberMe);

    if (response.user.role === "ADMIN") {
      navigate("/admin/home");
    } else {
      navigate("/main/home");
    }
  };

  return (
    <div className="mt-16">
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Otel Yönetim Sistemi - Giriş
          </h2>
          <form onSubmit={handleLogIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-posta <span className="text-red-500">*</span>
              </label>
              <input
                value={user.email}
                onChange={handleChangeUser}
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="E-posta adresinizi giriniz"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Şifre <span className="text-red-500">*</span>
              </label>
              <input
                value={user.password}
                onChange={handleChangeUser}
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Şifrenizi giriniz"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  checked={user.rememberMe}
                  onChange={handleChangeUser}
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Beni Hatırla
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/auth/change-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Giriş Yap
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
