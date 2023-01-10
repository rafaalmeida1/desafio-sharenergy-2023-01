import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { statusCode } from "../utils/statusCode";
import { Loading } from "../components/Loading";

export function HttpCat() {
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState(404);
  const [photo, setPhoto] = useState();

  const handleSearchStatus = async (status: number) => {
    try {
      setIsLoading(true);
      setStatus(status);
      let response: any = await axios.get(
        `http://localhost:5001/api/status/${status}`,
        {
          responseType: "arraybuffer",
        }
      );

      response = Buffer.from(response.data, "binary").toString("base64");
      setPhoto(response);
    } catch (err) {
      console.log(err);
      setStatus(404);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearchStatus(status);
  }, []);

  console.log(photo);

  return (
    <section className="mt-5 h-[490px] sm:h-[570px] mx-auto flex gap-2 text-gray-100 justify-center">
      <ul className="bg-gray-900 overflow-y-auto h-full flex flex-col gap-2">
        {statusCode.map((item) => (
          <li className="first:pt-4 pl-4 pr-6 text-gray-100 bg-transparent hover:bg-gray-800 cursor-pointer" onClick={(e) => setStatus(item)}>{item}</li>
        ))}
      </ul>

      <div className="flex flex-col items-center w-full md:w-[500px]">
        <div className="flex items-center gap-2 mb-5 w-full">
          <input
            type="number"
            placeholder="Status Code"
            className="flex-1 py-3 px-4 rounded-lg bg-blue-900 border border-gray-500 text-gray-100 placeholder:text-gray-400 transition-colors duration-100 focus:border-blue-800 focus:outline-none"
            onChange={(e) => setStatus(parseInt(e.target.value))}
            value={status}
          />
          <button className="text-sm sm:text-lg h-full border border-green-500 bg-green-500 hover:bg-transparent transition-all duration-150 text-gray-100 font-bold px-2 rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" onClick={() => handleSearchStatus(status)}>Veja um gatinho</button>
        </div>

        <div className="flex gap-2">
        {isLoading ? (
          <Loading />
        ) : (
          <img
            src={`data:image/png;base64,${photo}`}
            alt="cat"
            className="flex items-center justify-center w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]"
          />
        )}
        </div>
      </div>
    </section>
  );
}
