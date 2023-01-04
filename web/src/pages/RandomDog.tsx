import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../components/Loading";

interface RandomDogProps {
  url: string;
}

export function RandomDog() {
  const [randomDog, setRandomDogs] = useState({} as RandomDogProps);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomDog = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://random.dog/woof.json");
      setRandomDogs(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [randomDog]);

  useEffect(() => {
    getRandomDog();
  }, []);

  const randomDogMp4 = randomDog.url?.includes("mp4");

  return (
    <section className="mt-5 text-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center mt-5 w-96">
        <button
          onClick={() => getRandomDog()}
          className="flex items-center justify-center w-full h-10 rounded-lg bg-green-500 hover:bg-green-400 transition-all duration-100"
        >
          Veja mais um Dog
        </button>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-96 h-96 overflow-hidden mt-5">
            {randomDogMp4 ? (
              <video autoPlay loop className="w-full h-full scale-100 hover:scale-110 transition-transform duration-100">
                <source src={randomDog.url} type="video/mp4" />
              </video>
            ) : (
              <img src={randomDog.url} alt="" className="w-full h-full scale-100 hover:scale-110 transition-transform duration-100" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
