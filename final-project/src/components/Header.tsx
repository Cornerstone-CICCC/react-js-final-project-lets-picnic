"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiCartAlt, BiMenu, BiSearch, BiUser } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import Cart from "./Cart";
import toast from "react-hot-toast";
import { useSession } from "@/contexts/session.context";
import { useCart } from "@/contexts/cart.context";

interface Category {
  id: number;
  categoryName: string;
  description: string;
}

const extraPagesWithLinks = [
  {
    title: "About Us",
    links: [
      { name: "About", slug: "about" },
      { name: "Careers", slug: "careers" },
      { name: "Help", slug: "help" },
      { name: "News & Blog", slug: "news-blog" },
      { name: "Sustainability", slug: "sustainability" },
      { name: "Press", slug: "press" },
    ],
  },
  {
    title: "Brands",
    links: [
      { name: "Brands Overview", slug: "brands" },
      { name: "Brand Partners", slug: "brand-partners" },
      { name: "Brand Stories", slug: "brand-stories" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Contact Us", slug: "contact" },
      { name: "Customer Service", slug: "customer-service" },
      { name: "Store Locator", slug: "store-locator" },
    ],
  },
  {
    title: "Collections",
    links: [
      { name: "New Arrivals", slug: "new-arrivals" },
      { name: "Best Sellers", slug: "best-sellers" },
      { name: "Limited Editions", slug: "limited-editions" },
      { name: "Sale", slug: "sale" },
    ],
  },
  {
    title: "Gift Cards",
    links: [
      { name: "Buy Gift Cards", slug: "gift-cards" },
      { name: "Check Balance", slug: "gift-card-balance" },
    ],
  },
  {
    title: "Lookbook",
    links: [
      { name: "Spring Collection", slug: "lookbook-spring" },
      { name: "Summer Collection", slug: "lookbook-summer" },
      { name: "Autumn Collection", slug: "lookbook-autumn" },
      { name: "Winter Collection", slug: "lookbook-winter" },
    ],
  },
];

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalQuantity } = useCart();

  const { user, logout } = useSession();

  const getCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    setMounted(true);
    getCategories();
  }, []);

  useEffect(() => {
    if (totalQuantity > 0) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 300); // duración del bounce
      return () => clearTimeout(timeout);
    }
  }, [totalQuantity]);

  useEffect(() => {
    console.log("Current user from context:", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <>
      {mounted && (
        <>
          <AnimatePresence initial={false}>
            {(isMenuOpen || isCartOpen) && (
              <motion.div
                className="fixed inset-0 bg-neutral-900/80 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(false);
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.aside
                className="fixed top-0 right-0 h-full w-[280px] md:w-[320px] bg-white dark:bg-black z-50 p-6 shadow-lg flex flex-col overflow-y-auto hide-scrollbar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed self-end mb-4 text-neutral-500 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  ✕
                </button>

                {[
                  {
                    title: "Categories",
                    links: categories.map((cat) => ({
                      name: cat.categoryName.replace(/-/g, " "),
                      slug: `categories/${cat.id}`,
                    })),
                  },
                  ...extraPagesWithLinks.map(({ title, links }) => ({
                    title,
                    links,
                  })),
                ].map(({ title, links }) => (
                  <section key={title} className="mb-8 text-sm">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 capitalize">
                      {title}
                    </h2>
                    <ul className="flex flex-wrap gap-y-4">
                      {links.map(({ name, slug }) => (
                        <li key={slug} className="w-1/2">
                          <Link
                            href={`/${slug}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="dark:text-zinc-300 block w-full capitalize hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200"
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </motion.aside>
            )}
            {isCartOpen && (
              <motion.aside
                className="fixed z-100"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
              </motion.aside>
            )}
          </AnimatePresence>
          <header className="w-full flex justify-between items-center gap-2 px-4 md:px-10 lg:px-20 py-3 md:py-3 text-xl text-gray-800 bg-neutral-200 dark:bg-neutral-800 dark:text-gray-100 fixed z-30">
            <Link
              href="/"
              className={`text-2xl font-semibold transition-opacity duration-300 ${
                showSearch
                  ? "opacity-0 invisible md:opacity-100 md:visible"
                  : ""
              }`}
            >
              MANGO
            </Link>
            <nav className="hidden md:block">
              <ul className="flex justify-center items-center gap-6 lg:gap-10 text-sm font-semibold">
                {[
                  ["men", 1],
                  ["women", 5],
                  ["accessories", 3],
                  ["arrivals", 4],
                ].map((item) => (
                  <li className="text-center" key={item[0]}>
                    <Link
                      href={`/categories/${item[1]}`}
                      className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200 capitalize"
                    >
                      {item[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4 relative" ref={searchRef}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className={`fixed md:static left-5 md:left-0 px-2 py-1 border border-gray-900 dark:border-gray-300 text-sm outline-none bg-neutral-200 dark:bg-neutral-800 dark:text-white transition-all duration-300 ${
                  showSearch
                    ? "opacity-100 w-1/2 md:w-[150px] mr-2"
                    : "opacity-0 w-0 pointer-events-none"
                }`}
              />
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="cursor-pointer hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200"
                aria-label="Toggle search input"
              >
                <BiSearch />
              </button>
              {user ? (
                <div className="relative group inline-block">
                  <button
                    className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200 flex items-center"
                    aria-label="User menu"
                  >
                    <BiUser size={24} />
                  </button>
                  <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 absolute right-0 top-full w-40 bg-white dark:bg-neutral-900 rounded-md shadow-lg text-sm text-gray-700 dark:text-gray-300 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full text-left px-4 py-2 hover:bg-orange-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-colors"
                    >
                      Logout
                    </button>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-orange-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-colors"
                    >
                      My Orders
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200 flex items-center"
                  aria-label="Login"
                >
                  <BiUser size={24} />
                </Link>
              )}
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="cursor-pointer hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200"
                  aria-label="Cart"
                >
                  <BiCartAlt size={24} />
                </button>
                {totalQuantity > 0 && (
                  <motion.span
                    initial={false}
                    animate={isBouncing ? { y: [0, 2, -1, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-none absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {totalQuantity}
                  </motion.span>
                )}
              </div>
              <div className="h-7 w-0.5 bg-black dark:bg-white mx-2 rounded-full" />
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
                aria-label="Open menu"
              >
                <BiMenu />
              </button>
            </div>
          </header>
          ;
        </>
      )}
    </>
  );
};

export default Header;
