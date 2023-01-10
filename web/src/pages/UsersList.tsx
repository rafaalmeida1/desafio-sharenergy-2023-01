import { useContext, useEffect } from "react";
import { Loading } from "../components/Loading";
import * as Dialog from "@radix-ui/react-dialog";
import { NewUserModal } from "../components/NewUserModal";
import { UserListContext } from "../context/UserListContext";
import { Pencil, Trash } from "phosphor-react";
import { Link } from "react-router-dom";

export function UsersList() {
  const { getAllUsers, deleteUser, closeModal, open, users, isLoading } =
    useContext(UserListContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="mt-5 text-gray-100 flex flex-col items-center justify-center w-full pb-10">
      <Dialog.Root open={open} onOpenChange={closeModal}>
        <Dialog.Trigger asChild>
          <button className="mb-5 ml-auto h-12 border-0 bg-slate-600 hover:bg-slate-700 transition-colors duration-150 text-gray-100 font-bold rounded-lg px-5 cursor-pointer">
            Novo Usuário
          </button>
        </Dialog.Trigger>

        <NewUserModal />
      </Dialog.Root>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full overflow-x-auto overflow-y-auto relative shadow-md shadow-slate-800 rounded-lg">
          {users.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-100 ">
              <thead className="text-xs uppercase ">
                <tr className="border-b border-gray-700 bg-gray-800">
                  <th scope="col" className="py-3 px-6">
                    Nome
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Telefone
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Endereço
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CPF
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    className="border-b border-gray-700 bg-gray-900 hover:bg-opacity-30 transition-all duration-150"
                    key={user._id}
                  >
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6 font-medium  whitespace-nowrap ">
                      {user.email}
                    </td>
                    <td className="py-4 px-6">{user.phone}</td>
                    <td className="py-4 px-6">{user.address}</td>
                    <td className="py-4 px-6">{user.cpf}</td>
                    <td className="flex justify-center items-center">
                      <button
                        className="w-full text-red-500 flex items-center justify-center py-4 px-2 bg-transparente hover:bg-gray-800"
                        onClick={() => deleteUser(user._id)}
                      >
                        <Trash size={20} />
                      </button>
                      <Link to={`/usersList/${user._id}`} className="w-full">
                        <button className="w-full text-blue-500 flex items-center justify-center py-4 px-2 bg-transparente hover:bg-gray-800">
                          <Pencil size={20} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex flex-col items-center justify-center text-center">
              <span className="text-lg text-gray-300">Não tem nenhum usuário cadastrado!!</span>
              <p className="text-base text-gray-500">Cadastre um no botão de <strong className="font-bold text-white">Novo Usuário</strong> localizado acima</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
