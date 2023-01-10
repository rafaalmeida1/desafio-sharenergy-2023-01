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
  randomUserData: RandomUserDataProps[];
  isLoading: boolean;
  page: number;
  searchUser: () => void;
  nextPage: () => void;
  previousPage: () => void;
}

interface RandomUserProviderProps {
  children: ReactNode;
}

export const RandomUserContext = createContext({} as RandomUserContextType);

export function RandomUserProvider({ children }: RandomUserProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [randomUserData, setRandomUserData] = useState<RandomUserDataProps[]>(
    []
  );

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    async function getRandomUserData() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://randomuser.me/api/?page=${page}&results=5&seed=abc`
        );
        setRandomUserData(response.data.results);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getRandomUserData();
  }, [page]);

  const searchUser = async () => {
    const input = document.querySelector("input");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://randomuser.me/api/?page=${page}&results=2500&seed=abc`
      );
      const filteredUser = response.data.results.filter(
        (user: RandomUserDataProps) => {
          const userData = [
            user.email.toLowerCase(),
            user.name.first.toLowerCase(),
            user.name.last.toLowerCase(),
            user.login.username.toLowerCase(),
          ];
          if (userData.includes(input!.value.toLowerCase())) {
            return user
          }
          
        }
      );
      setIsLoading(false);
      setRandomUserData(filteredUser);
    } catch(err) {
      alert('você pesquisou de mais')
    }
  };

  return (
    <RandomUserContext.Provider
      value={{
        randomUserData,
        isLoading,
        page,
        searchUser,
        nextPage,
        previousPage,
      }}
    >
      {children}
    </RandomUserContext.Provider>
  );
}
