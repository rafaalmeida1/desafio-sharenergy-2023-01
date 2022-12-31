import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface RandomUserDataProps {
  picture: {
    medium: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  dob: {
    age: number;
  };
}

interface RandomUserContextType {
  getRandomUserData: (query?: string) => Promise<void>;
  randomUserData: RandomUserDataProps[];
  isLoading: boolean;
}

interface RandomUserProviderProps {
  children: ReactNode  
}

export const RandomUserContext = createContext({} as RandomUserContextType);

export function RandomUserProvider({children}: RandomUserProviderProps) {
  const [randomUserData, setRandomUserData] = useState<RandomUserDataProps[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  async function getRandomUserData(query?: string) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://randomuser.me/api/`, {
          params: {
            q: query,
            results: 5,
          }
        }
      );
      setRandomUserData(response.data.results);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRandomUserData();
  }, []);

  return (
    <RandomUserContext.Provider value={{ getRandomUserData, randomUserData, isLoading}}>
      {children}
    </RandomUserContext.Provider>
  )
}