import { Disclosure, Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { List, SignOut, UserCircle, X } from "phosphor-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  function Logout() {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    navigate("/login");
  }

  const MenuItems = ["home", "about", "services", "contact"];

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl text-gray-100">Sharenergy</h1>

          <Menu as="div" className="ml-3 relative">
            {({ open }) => (
              <>
                <Menu.Button className="max-w-xs  rounded-full flex items-center outline-none text-sm focus:outline-none focus:ring-offset-gray-800 ">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <X
                      className="block h-7 w-7 text-gray-400 outline-none"
                      aria-hidden="true"
                    />
                  ) : (
                    <List
                      className="block h-7 w-7 text-gray-400 outline-none"
                      aria-hidden="true"
                    />
                  )}
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
                    className="flex z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md shadow-gray-700 px-2 bg-gray-800  focus:outline-none"
                  >
                    <div className="flex-1">
                      {MenuItems.map((item, index) => (
                        <Menu.Item key={item}>
                          {index === 0 ? (
                            <a
                              href="/"
                              className={classNames("p-2 hover:text-white", {
                                "text-gray-400": path !== `/`,
                                "text-white": path === `/`,
                              })}
                            >
                              <p className="capitalize">{item}</p>
                            </a>
                          ) : (
                            <a
                              href={`/${item}`}
                              className={classNames("p-2 hover:text-white", {
                                "text-gray-400": path !== `/${item}`,
                                "text-white": path === `/${item}`,
                              })}
                            >
                              <p className="capitalize">{item}</p>
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>

                    <button
                      onClick={() => Logout()}
                      className="text-red-500 hover:text-red-700 pb-5 ml-auto mt-auto transition-all duration-100"
                    >
                      <SignOut size={32} />
                    </button>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
}
