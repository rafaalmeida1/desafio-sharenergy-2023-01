import { createContext, ReactNode, useCallback, useState } from "react";
import { api } from "../lib/api";

interface UserListProps {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  cpf: number;
}

interface newUserProps {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  cpf: number;
}

interface UserListValues {
  getAllUsers: () => Promise<void>;
  createUser: (data: newUserProps) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  isLoading: boolean;
  users: UserListProps[];
}

export const UserListContext = createContext({} as UserListValues);

interface UserListProviderProps {
  children: ReactNode;
}

export function UserListProvider({ children }: UserListProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserListProps[]>([]);

  const getAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("users-list/getUsers");
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [users]);

  const createUser = useCallback(async (data: newUserProps) => {
    const { id, name, email, phone, address, cpf } = data;

    const response = await api.post("users-list/createUser", {
      id,
      name,
      email,
      phone,
      address,
      cpf,
    });

    setUsers((state) => [response.data, ...state]);
    getAllUsers();
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await api.post('/users-list/deleteUser', {
      id: id
    })

    getAllUsers();
  }, []);

  return (
    <UserListContext.Provider
      value={{ isLoading, users, getAllUsers, createUser, deleteUser }}
    >
      {children}
    </UserListContext.Provider>
  );
}
