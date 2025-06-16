"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { NewUser, newUser } from "../actions/user.actions";
import { useRouter } from "next/navigation";
import { useSession } from "@/contexts/session.context";
import toast from "react-hot-toast";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";

const Page = () => {
  const router = useRouter();
  const { login } = useSession();
  const [isSignup, setIsSignup] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const userInfo: NewUser = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      role: form.get("role") as string,
    };

    try {
      const res = await newUser(userInfo);
      toast.success("Account created successfully!");
      setIsSignup(false);
    } catch (error) {
      toast.error("Failed to create account")
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      await login(email, password);
      router.push("/");
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Check your credentials.");
    }
  };

  const fadeSlide = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <main className="min-h-screen px-6 py-20 bg-stone-200 dark:bg-neutral-900 flex items-center justify-center transition-all duration-300">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg overflow-hidden bg-white dark:bg-neutral-800 transition-all duration-300">
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 justify-center relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSignup ? (
              <motion.div key="signup" {...fadeSlide} className="w-full">
                <div className="text-center flex flex-col gap-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    Create Account
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-gray-300">
                    Sign up to get started with Mango
                  </p>
                </div>
                <form
                  className="flex flex-col gap-5 w-full mt-4"
                  onSubmit={handleSignup}
                >
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    First Name
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="text"
                      placeholder="John"
                      name="firstName"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Last Name
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="text"
                      placeholder="Doe"
                      name="lastName"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Email
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="email"
                      placeholder="john@example.com"
                      name="email"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Password
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="password"
                      placeholder="••••••••"
                      name="password"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Role
                    <select
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      defaultValue=""
                      name="role"
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                  <input
                    className="bg-black text-white text-sm p-3 uppercase cursor-pointer hover:opacity-90 transition"
                    type="submit"
                    value="Sign Up"
                  />
                </form>
                <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsSignup(false)}
                    className="underline cursor-pointer hover:text-black dark:hover:text-white"
                  >
                    Login
                  </span>
                </p>
              </motion.div>
            ) : (
              <motion.div key="login" {...fadeSlide} className="w-full">
                <div className="text-center flex flex-col gap-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-gray-300">
                    Login to your Mango account
                  </p>
                </div>
                <form
                  className="flex flex-col gap-5 w-full mt-4"
                  onSubmit={handleLogin}
                >
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Email
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="email"
                      name="email"
                      placeholder="hello@gmail.com"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-black dark:text-white">
                    Password
                    <input
                      className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                    />
                  </label>
                  <input
                    className="bg-black text-white text-sm p-3 uppercase cursor-pointer hover:opacity-90 transition"
                    type="submit"
                    value="Login"
                  />
                </form>
                <p className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 my-4">
                  <span className="flex-grow border-t border-gray-300 dark:border-neutral-600"></span>
                  <span className="px-3">Or continue with</span>
                  <span className="flex-grow border-t border-gray-300 dark:border-neutral-600"></span>
                </p>
                <div className="flex justify-center gap-5 mt-2">
                  <FaGoogle />
                  <FaFacebookF />
                  <FaXTwitter />
                </div>
                <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-4">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsSignup(true)}
                    className="underline cursor-pointer hover:text-black dark:hover:text-white"
                  >
                    Sign up
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden md:block w-1/2">
          <GiClothes className="w-full h-full" />
        </div>
      </div>
    </main>
  );
};

export default Page;
