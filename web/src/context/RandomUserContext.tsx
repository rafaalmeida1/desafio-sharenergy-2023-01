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
  getRandomUserData: (page: number) => Promise<void>;
  randomUserData: RandomUserDataProps[];
  isLoading: boolean;
  query: string;
  setSearchQuery: (value: string) => void;
  searchUser: (data: RandomUserDataProps[]) => RandomUserDataProps[];
}

interface RandomUserProviderProps {
  children: ReactNode;
}

export const RandomUserContext = createContext({} as RandomUserContextType);

export function RandomUserProvider({ children }: RandomUserProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [randomUserData, setRandomUserData] = useState<RandomUserDataProps[]>(
    []
  );
  const [query, setQuery] = useState("");

  const setSearchQuery = (value: string) => {
    setQuery(value);
  };

  async function getRandomUserData(page: number) {
    const pagination = page <= 1 ? 1 : page;

    try {
      setIsLoading(true);
      const response = await axios.get(`https://randomuser.me/api/`, {
        params: {
          results: 5,
          page: pagination
        },
      });
      setRandomUserData(response.data.results);
    } finally {
      setIsLoading(false);
    }
  }

  const searchUser = (data: RandomUserDataProps[]) => {
    return data.filter((data: any) =>
      data?.name.first.toLowerCase().includes(query) ||
      data?.name.last.toLowerCase().includes(query) ||
      data?.email.toLowerCase().includes(query) ||
      data?.login.username.toLowerCase().includes(query) 
    );
  };

  return (
    <RandomUserContext.Provider
      value={{
        getRandomUserData,
        randomUserData,
        isLoading,
        searchUser,
        query,
        setSearchQuery,
      }}
    >
      {children}
    </RandomUserContext.Provider>
  );
}
