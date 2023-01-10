import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { LogoutButton } from "./HeaderComponents/LogoutButton";
import { MenuItems } from "./HeaderComponents/MenuItems";

export function Header() {
  return (
    <>
      <div className="max-w-5xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <img src={logoImg} alt="" className="w-64" />
          </Link>

          <div className="flex items-center justify-center gap-2">
            <MenuItems />
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
