import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useUserLogout } from "../../context/UserContextProvider";
import Image from "next/image";
import { Dropdown, Avatar, Tooltip, Divider } from "@nextui-org/react";
import { useUser } from "../../context/UserContextProvider";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import { pb } from "../../libs/pocketbase";
import Dropdownli from "./Dropdownli";

export default function Layout({ children }) {
  const logout = useUserLogout();
  const router = useRouter();
  const user = useUser();

  console.log(user);

  let navDetail = [
    {
      title: "Company Management",
      dropdowns: [
        {
          id: 0,
          title: "Company Info",
          link: "/companies",
        },
        {
          id: 1,
          title: "Jobs",
          link: "/companies/jobs",
        },
      ],
    },
    {
      title: "Customer Management",
      dropdowns: [
        {
          id: 0,
          title: "Applications",
          link: "/customer/applications",
        },
        {
          id: 1,
          title: "Approved Customers",
          link: "/customer/approvedcustomers",
        },
      ],
    },
    {
      title: "Agent Management",
      dropdowns: [
        {
          id: 0,
          title: "Agent Info",
          link: "/agents",
        },
      ],
    },
  ];

  const onSelectHandler = (e) => {
    // @ts-ignore
    if (e === "logout") logout();
  };

  if (
    router.pathname === "/login" ||
    router.pathname === "/customer/jobs" ||
    router.pathname === "/customer/checkprogress"
  ) {
    return (
      <div className="font-hind">
        {children}
        <ToastContainer />
      </div>
    );
  }
  return (
    <>
      <div className="h-screen w-full flex font-hind">
        <div
          className="sideb`ar h-full lg:w-1/5 md:w-1/4 w-0 flex flex-col justify-between bg-no-repeat bg-cover bg-center bg-blend-overlay bg-white bg-opacity-90"
          style={{ backgroundImage: "url('/img/out.png')" }}
        >
          <Link
            href={"/"}
            className="w-full flex justify-center items-center flex-col p-3"
          >
            <Image
              src={"/img/logo.png"}
              width={80}
              height={80}
              className="p-2"
              alt={"sayemlogo"}
            />
            <span className="text-xs font-light">Overseas Business Hub</span>
          </Link>
          <ul className="mt-5 h-full px-4">
            <li className="border-b border-gray-300">
              <Link
                href={"/"}
                className="py-2 flex justify-between items-center"
              >
                <span>Dashboard</span>
                <GrFormNext />
              </Link>
            </li>
            {navDetail.map((navIndi) => (
              <Dropdownli
                list={navIndi}
                key={navIndi.title}
                current={router.pathname}
              />
            ))}
          </ul>
          <div className=" border-t border-gray-300 h-24 flex justify-center">
            <Dropdown>
              <Dropdown.Trigger>
                <div className="px-5 w-full profile cursor-pointer flex justify-between items-center">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Avatar
                      // @ts-ignore
                      text={user ? user?.name[0].toUpperCase() : ""}
                      src={
                        user
                          ? // @ts-ignore
                            pb.getFileUrl(user, user.avatar, {
                              thumb: "100x250",
                            })
                          : ""
                      }
                      // color={"gradient"}
                      textColor="white"
                      size={"md"}
                      // squared
                    />
                    <span className="text-xs">
                      {user
                        ? // @ts-ignore
                          user.name
                        : ""}
                    </span>
                  </div>
                  <GrFormNext />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu
                // color="primary"
                textColor="default"
                aria-label="Avatar Actions"
                onAction={onSelectHandler}
              >
                <Dropdown.Item textValue="Account" key="account">
                  <span className="font-hind">Account</span>
                </Dropdown.Item>
                <Dropdown.Item
                  textValue="Tutorials"
                  key="analytics"
                  withDivider
                >
                  <span className="font-hind">Tutorials</span>
                </Dropdown.Item>
                <Dropdown.Item textValue="FAQ" key="faq">
                  <span className="font-hind">FAQ</span>
                </Dropdown.Item>
                <Dropdown.Item
                  textValue="Help & Feedback"
                  key="help_and_feedback"
                >
                  <span className="font-hind">Help & Feedback</span>
                </Dropdown.Item>
                <Dropdown.Item
                  textValue="logout"
                  key="logout"
                  color="error"
                  withDivider
                >
                  <span className="font-hind">Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <ToastContainer />
    </>
  );
}
