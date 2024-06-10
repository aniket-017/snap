"use client";

import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export default function AuthenticationPage() {
  return (
    <>
      <div className=" w-full  h-screen flex items-center justify-center  lg:px-0">
        <div className="relative hidden h-screen flex-col w-3/4   dark:border-r lg:flex">
        <div className="absolute top-20 left-20 right-20 z-10">
            <h1 className="text-white text-4xl font-bold cursor-pointer"><Link href="/">Snapcheck</Link></h1>
            <p className="text-white font-semibold mt-2 cursor-pointer pr-10">Lorem, ipsum  porro aspernatur eos voluptatum commodi facilis! Autem similique dolorum eos, nesciunt magnam ex alias suscipit aut.</p>

          </div>
          <Image
            src="/images/login.jpeg"
            fill
            alt="signup.png"
            quality={100}
            className="block dark:hidden h-screen object-fill w-full"
          />
          <Image
            src="/images/login.jpeg"
            fill
            alt="signup.png"
            quality={100}
            className="hidden brightness-75 dark:block object-fill h-screen w-full filter   "
          />
        </div>

        {/* Signup Form */}
        <div className="p-3  sm:p-5  md:p-8  ">
          <div className="mx-auto flex w-full flex-col lg:justify-center space-y-6  sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
            </div>
            <UserAuthForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have a account{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
