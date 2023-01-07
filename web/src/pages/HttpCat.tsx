import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { statusCode } from "../utils/statusCode";
import { Loading } from "../components/Loading";

export function HttpCat() {
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState(100);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearchStatus(status);
  }, [status]);

  return (
    <section className="mt-5 text-gray-100 w-[500px] mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-full mb-5">
          <select
            className="bg-gray-50 border border-gray-300 hover:border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-[#1c2f41] focus:border-[#1c2f41] block w-full p-2.5 transition-all duration-150 cursor-pointer"
            onChange={(e) => setStatus(parseInt(e.target.value))}
          >
            {statusCode.map((status, index) =>
              index === 0 ? (
                <option key={status} value={status} selected>
                  {status}
                </option>
              ) : (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <img
            src={`data:image/png;base64,${photo}`}
            alt="cat"
            className="flex items-center justify-center w-[500px] h-[500px]"
          />
        )}
      </div>
    </section>
  );
}
