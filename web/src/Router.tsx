import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <Home />
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
