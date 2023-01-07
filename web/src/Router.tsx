import { ReactElement, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RandomUserProvider } from "./context/RandomUserContext";
import { UserListProvider } from "./context/UserListContent";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { HttpCat } from "./pages/HttpCat";
import { Login } from "./pages/Login";
import { RandomDog } from "./pages/RandomDog";
import { UniqueUser } from "./pages/uniqueUser";
import { UsersList } from "./pages/UsersList";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <RandomUserProvider>
                <Home />
              </RandomUserProvider>
            </ProtectedRouter>
          }
        />
        <Route
          path="/httpCat"
          element={
            <ProtectedRouter>
              <HttpCat />
            </ProtectedRouter>
          }
        />
        <Route
          path="/randomDog"
          element={
            <ProtectedRouter>
              <RandomDog />
            </ProtectedRouter>
          }
        />

        <Route
          path="/usersList"
          element={
            <ProtectedRouter>
              <UserListProvider>
                <UsersList />
              </UserListProvider>
            </ProtectedRouter>
          }
        />

        <Route
          path="/usersList/:id"
          element={
            <ProtectedRouter>
              <UniqueUser />
            </ProtectedRouter>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

interface ProtectedRouterProps {
  children: ReactNode;
}

export function ProtectedRouter({
  children,
}: ProtectedRouterProps): ReactElement | any {
  if (localStorage.getItem("auth") || sessionStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
