import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { List, X } from "phosphor-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export function MenuItems() {
  const path = window.location.pathname;

  const MenuItems = ["home", "httpCat", "randomDog", "usersList"];

  return (
    <Menu as="div" className="relative">
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
              className="flex z-40 origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-md shadow-gray-700 px-2 bg-gray-800  focus:outline-none"
            >
              <div className="flex-1 flex flex-col gap-2 py-2">
                {MenuItems.map((item, index) => (
                  <Menu.Item key={item}>
                    {index === 0 ? (
                      <Link
                        to="/"
                        className={classNames("p-2 hover:text-white", {
                          "text-gray-400": path !== `/`,
                          "text-white": path === `/`,
                        })}
                      >
                        <p className="capitalize">{item}</p>
                      </Link>
                    ) : (
                      <Link
                        to={`/${item}`}
                        className={classNames("p-2 hover:text-white", {
                          "text-gray-400": path !== `/${item}`,
                          "text-white": path === `/${item}`,
                        })}
                      >
                        <p className="capitalize">{item}</p>
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>

            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
