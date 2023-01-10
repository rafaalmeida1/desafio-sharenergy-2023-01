import { Menu, Transition } from "@headlessui/react";
import { SignOut } from "phosphor-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <Menu.Button className="ml-auto transition-all duration-100">
            <span className="sr-only">Open logout button</span>
            <SignOut
              className="block h-7 w-7 text-red-500 hover:text-red-700 transition-all duration-100 outline-none"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="w-32 px-2 py-5 mt-2 flex flex-col gap-2 items-center z-40 origin-top-right absolute right-0 rounded-md shadow-md shadow-gray-700 bg-gray-800  focus:outline-none"
            >
                <h3 className="text-lg">Tem Certeza?</h3>
                <button onClick={() => Logout()} className="w-full p-3 border border-red-500 bg-red-500 hover:bg-transparent transition-colors duration-100 rounded-lg">Sim</button>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
