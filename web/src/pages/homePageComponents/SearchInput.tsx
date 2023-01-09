import { useContext } from "react";
import { RandomUserContext } from "../../context/RandomUserContext";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = zod.object({
  query: zod.string(),
});

type searchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchInput() {
  const { searchUser } = useContext(RandomUserContext);
  const { register, handleSubmit } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  return (
    <form
      className="flex gap-2 items-center justify-center mt-10 mb-4"
      onSubmit={handleSubmit(searchUser)}
    >
      <input
        autoComplete="off"
        id="searchInput"
        type="text"
        placeholder="Buscar usuário"
        {...register("query")}
        className="flex-1 py-3 px-4 rounded-lg bg-blue-900 border border-gray-500 text-gray-100 placeholder:text-gray-400 transition-olors duration-100 focus:border-blue-800 focus:outline-none"
      />
      <button className="border-0 bg-green-500 hover:bg-opacity-60 transition-all duration-150 text-gray-100 font-bold py-3 px-4 rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
        Procurar
      </button>
    </form>
  );
}
