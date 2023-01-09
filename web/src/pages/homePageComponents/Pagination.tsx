import { useContext } from "react";
import { RandomUserContext } from "../../context/RandomUserContext";

export function Pagination() {
  const { page, nextPage, previousPage } = useContext(RandomUserContext);
  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-all duration-150 rounded-lg text-gray-100"
        onClick={() => previousPage()}
      >
        -
      </button>
      <p>{page}</p>
      <button
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-all duration-150 rounded-lg text-gray-100"
        onClick={() => nextPage()}
      >
        +
      </button>
    </div>
  );
}
