import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <div className="bg-blue-900 min-h-screen">
      <Header />
      <main className="w-full max-w-4xl my-0 mx-auto py-0 px-4 md:px-0">
        <Outlet />
      </main>
    </div>
  );
}
