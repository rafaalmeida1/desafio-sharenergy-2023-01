import { useContext, useEffect } from "react";
import { Loading } from "../components/Loading";
import { RandomUserContext } from "../context/RandomUserContext";
import { Pagination } from "./homePageComponents/Pagination";
import { SearchInput } from "./homePageComponents/SearchInput";

export function Home() {
  const { getRandomUserData, isLoading, randomUserData, searchUser } =
    useContext(RandomUserContext);

  useEffect(() => {
    getRandomUserData(1);
  }, []);

  return (
    <section className="mt-5 text-gray-100">
      <SearchInput />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto relative shadow-md shadow-slate-800 rounded-lg">
          <table className="w-full text-sm text-left text-gray-100 ">
            <thead className="text-xs text-gray-100 uppercase ">
              <tr className="border-b border-gray-700 bg-gray-800">
                <th scope="col" className="py-3 px-6">
                  Picture
                </th>
                <th scope="col" className="py-3 px-6 text-gray-100">
                  Full Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Age
                </th>
                <th scope="col" className="py-3 px-6 text-gray-100">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  UserName
                </th>
              </tr>
            </thead>
            <tbody>
              {searchUser(randomUserData).map((user) => (
                <tr className="border-b border-gray-700 bg-gray-900 hover:bg-opacity-30 transition-all duration-150">
                  <td className="py-4 px-6">
                    <img src={user.picture.medium} width="60px" />
                  </td>
                  <th
                    scope="row"
                    className="capitalize py-4 px-6 font-medium  whitespace-nowrap  text-gray-100"
                  >
                    {user.name.first.toLowerCase()}{" "}
                    {user.name.last.toLowerCase()}
                  </th>
                  <td className="py-4 px-6">{user.dob.age}</td>
                  <td className="py-4 px-6 ">{user.email}</td>
                  <td className="py-4 px-6">{user.login.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      )}
    </section>
  );
}
