import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserListContext } from "../context/UserListContext";
import { v4 } from "uuid";

const newUserFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  address: z.string(),
  cpf: z.number(),
});

type newUserFormInputs = z.infer<typeof newUserFormSchema>;

export function NewUserModal() {
  const { createUser, closeModal } = useContext(UserListContext);

  const { register, handleSubmit, reset } = useForm<newUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
  });

  async function handleCreateNewUser(data: newUserFormInputs) {
    const { name, email, phone, address, cpf } = data;

    await createUser({
      id: v4(),
      name,
      email,
      phone,
      address,
      cpf,
    });

    closeModal(false);

    reset();
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75" />

      <Dialog.Content
        id="modal-content"
        className="min-w-[32rem] rounded-lg py-10 px-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative px-5 xs:px-0">
          <Dialog.Close className="absolute bg-transparent border-0 top-4 right-14 xs:right-8 leading-[0] cursor-pointer text-gray-100">
            <X size={24} />
          </Dialog.Close>

          <form
            className="mx-5 p-6 flex-1 flex flex-col gap-2 rounded-lg bg-gray-900 transition-all duration-150"
            onSubmit={handleSubmit(handleCreateNewUser)}
          >
            <label className="text-gray-100" htmlFor="name">
              Nome
            </label>
            <input
              className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
              id="name"
              type="text"
              {...register("name")}
            />

            <label className="text-gray-100" htmlFor="email">
              E-mail
            </label>
            <input
              className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
              id="email"
              type="email"
              {...register("email")}
            />

            <label className="text-gray-100" htmlFor="phone">
              Telefone
            </label>
            <input
              className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
              id="phone"
              type="number"
              {...register("phone", { valueAsNumber: true })}
            />

            <label className="text-gray-100" htmlFor="address">
              Endereço
            </label>
            <input
              className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
              id="address"
              type="text"
              {...register("address")}
            />

            <label className="text-gray-100" htmlFor="cpf">
              CPF
            </label>
            <input
              className="rounded-lg border border-gray-100 bg-gray-900 text-gray-100 py-1 px-4 focus:border-gray-400"
              id="cpf"
              type="number"
              {...register("cpf", { valueAsNumber: true })}
            />

            <button
              type="submit"
              className="h-14 border border-green-500 bg-green-500 hover:bg-transparent transition-all duration-150 text-gray-100 font-bold px-0 rounded-lg mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
