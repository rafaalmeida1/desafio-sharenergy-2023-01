import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { RandomUserContext } from "../../context/RandomUserContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function SearchInput() {
  const { getRandomUserData } = useContext(RandomUserContext);

  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchPost(data: SearchFormInput) {
    await getRandomUserData(data.query);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchPost)}
      className="w-full mt-10 mb-4"
    >
      <input
        autoComplete="off"
        type="text"
        placeholder="Buscar usuário"
        {...register("query")}
        className="w-full py-3 px-4 rounded-lg bg-blue-900 border border-gray-500 text-gray-100 placeholder:text-gray-400 transition-colors duration-100 focus:border-blue-800 focus:outline-none"
      />
    </form>
  );
}
