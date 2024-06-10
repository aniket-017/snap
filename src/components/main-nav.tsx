"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { getCookie } from "cookies-next";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    id: 1,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    text: "About Us",
    link: "#",
  },
  {
    id: 3,
    text: "Products",
    link: "#product",
  },
  {
    id: 5,
    text: "Solutions",
    link: "#",
  },
  {
    id: 6,
    text: "Pricing",
    link: "/pricing",
  },
  {
    id: 7,
    text: "Resources",
    link: "#",
  },
  {
    id: 8,
    text: "Contact us",
    link: "/contact",
  },
];

export default function MainNav() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = getCookie('admin_token')
const [myToken , setMyToken] = useState("")

useEffect(() => {
  const getDetails = async () => {
    try {
      const res = await fetch("/api/check-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Admin details:", data.data);
        setIsAdmin(data.data)
      } else {
        console.error("Failed to fetch Admin details:", res.statusText);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };
  getDetails();
}, []);

  const toggleNavbar = () => {
    setOpenNavbar((openNavbar) => !openNavbar);
  };

  const closeNavbar = () => {
    setOpenNavbar(false);
  };

  return (
    <>
      <div
        onClick={() => {
          closeNavbar();
        }}
        aria-hidden="true"
        className={`fixed inset-0 z-30 ${
          openNavbar ? "flex lg:hidden" : "hidden"
        }`}
      />
      <header className="sticky top-0 w-full flex items-center h-20 z-40 bg-background">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <Link href="/" className="font-semibold flex items-center gap-x-2">
              <span className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-primary" />
                <span className="w-3 h-6 rounded-r-full flex bg-background mt-2" />
              </span>
              <span className="text-lg">Snapcheck</span>
            </Link>
          </div>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-full left-0 bg-background lg:bg-transparent border-b py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:flex lg:justify-between duration-300 ease-linear ${
              openNavbar
                ? ""
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center lg:w-full lg:justify-center">
              {navItems.map((navItem) => (
                <motion.li key={navItem.id} whileHover={{ scale: 1.1 }}>
                  <Link
                    href={navItem.link}
                    className="relative py-2.5 duration-100 ease-linear after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-100 after:bg-primary"
                  >
                    {navItem.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              <ThemeToggle />
              {isAdmin ? (
                <Link
                  href="/admin/dashboard"
                  className="px-6 py-3 font-semibold duration-300 ease-linear flex justify-center w-full sm:w-auto border border-primary text-primary hover:text-white hover:bg-primary dark:text-white dark:bg-primary rounded-full"
                >
                  View Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-3 font-semibold duration-300 ease-linear flex justify-center w-full sm:w-auto border border-primary text-primary hover:text-white hover:bg-primary dark:text-white dark:bg-primary rounded-full"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
          <div className="flex items-center lg:hidden">
            <motion.button
              onClick={() => {
                toggleNavbar();
              }}
              aria-label="toggle navbar"
              whileTap={{ scale: 0.9 }}
              className="outline-none pr-3 relative py-3 children:flex"
            >
              {openNavbar ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </nav>
      </header>
    </>
  );
}
