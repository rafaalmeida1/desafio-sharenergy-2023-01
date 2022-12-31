import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Lock, Spinner } from "phosphor-react";

const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormInput = z.infer<typeof LoginFormSchema>;

export function Login() {
  const [remember, setRemember] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleLoginSubmitForm(data: LoginFormInput) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5001/api/users/login",
        data
      );
      if (remember === true) {
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        sessionStorage.setItem("auth", JSON.stringify(res.data));
      }

      if (res.data.user !== null) {
        navigate("/");
      } else {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
        navigate("/login");
        setErrorInput(true);
      }
    } catch (err) {
      console.log(err);
      setErrorInput(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-200">
      <div className="max-w-md w-full -translate-y-20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-4 space-y-6 px-4 py-8 border rounded-lg shadow-md shadow-gray-800"
          onSubmit={handleSubmit(handleLoginSubmitForm)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only text-white">
                Email address
              </label>
              <input
                id="email"
                type="text"
                autoComplete="email"
                required
                className="bg-gray-800 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-100 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Rafael Almeida"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-800 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-100 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="********"
                {...register("password")}
              />
            </div>
            {errorInput && (
              <p className="text-xs text-red-500">
                Ocorreu um error ao se conectar
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-white-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-100"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <Spinner className="animate-spin" size={20}/>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock
                      className="h-5 w-5 text-red-500 group-hover:text-red-400 duration-150"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
