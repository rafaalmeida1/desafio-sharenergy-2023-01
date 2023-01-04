import { useContext } from "react";
import { RandomUserContext } from "../../context/RandomUserContext";

export function SearchInput() {
  const { setSearchQuery } = useContext(RandomUserContext);

  return (
    <input
      autoComplete="off"
      type="text"
      placeholder="Buscar usuário"
      className="lowercase w-full mt-10 mb-4 py-3 px-4 rounded-lg bg-blue-900 border border-gray-500 text-gray-100 placeholder:text-gray-400 transition-colors duration-100 focus:border-blue-800 focus:outline-none"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
