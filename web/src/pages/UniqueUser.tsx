import { CaretLeft } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { UserListProps } from "../context/UserListContext";
import { api } from "../lib/api";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userDetails = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  address: z.string(),
  cpf: z.number(),
});

type userDetailsProps = z.infer<typeof userDetails>;

export function UniqueUser() {
  const [userData, setUserData] = useState<UserListProps>({} as UserListProps);
  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit, register } = useForm<userDetailsProps>({
    resolver: zodResolver(userDetails),
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`users-list/getUser/${id}`);
      setUserData(response.data.user);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [userData]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleChangeUser = useCallback(async (data: userDetailsProps) => {
    const { name, email, phone, address, cpf } = data;
    try {
      setIsLoading(true);

      await api.put(`users-list/updateUser/${id}`, {
        name,
        email,
        phone,
        address,
        cpf,
      });

      navigate("/usersList");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section className="w-full sm:w-[750px] mx-auto">
      <Link to={"/usersList"} className="flex items-center text-gray-100">
        <CaretLeft size={24} />
        <h3>Volta</h3>
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <form onSubmit={handleSubmit(handleChangeUser)}>
            <div className="mt-2 mx-5 p-6 flex-1 flex flex-col gap-2 rounded-lg bg-gray-900 transition-all duration-150">
              <label className="text-gray-100" htmlFor="name">
                Nome
              </label>
              <input
                className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
                type="text"
                id="name"
                {...register("name")}
                defaultValue={userData.name}
              />
              <label className="text-gray-100" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
                type="email"
                id="email"
                {...register("email")}
                defaultValue={userData.email}
              />
              <label className="text-gray-100" htmlFor="phone">
                Telefone
              </label>
              <input
                className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
                type="number"
                id="phone"
                {...register("phone", { valueAsNumber: true })}
                defaultValue={userData.phone}
              />
              <label className="text-gray-100" htmlFor="address">
                Endereço
              </label>
              <input
                className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
                type="text"
                id="address"
                {...register("address")}
                defaultValue={userData.address}
              />
              <label className="text-gray-100" htmlFor="cpf">
                CPF
              </label>
              <input
                className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
                type="number"
                id="cpf"
                {...register("cpf", { valueAsNumber: true })}
                defaultValue={userData.cpf}
              />
              <button
                type="submit"
                className="h-14 border border-green-500 bg-green-500 hover:bg-transparent transition-all duration-150 text-gray-100 font-bold px-0 rounded-lg mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Enviar alterações
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
