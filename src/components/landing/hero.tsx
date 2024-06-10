"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image"; // Import Image component from Next.js

export const Hero = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <Image
        src="/images/hero2.jpg"
        alt="Background Image"
        fill
        quality={100}
        className=" block dark:hidden"
      />
      <Image
        src="/images/hero2.jpg"
        alt="Background Image"
        fill
        quality={100}
        className="filter brightness-50 opacity-50 hidden dark:block"
      />

      {/* Content */}
      <section className="container relative z-10 sm:h-[500px] lg:h-screen grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl text-4xl md:text-5xl  lg:text-6xl font-bold text-white">
            <h1 className="inline bg-clip-text">
              Modernize <span></span>
            </h1>{" "}
            <h2 className="inline text-white">the way you hire.</h2>
          </main>

          <p className="text-lg md:text-xl text-white md:w-10/12 mx-auto lg:mx-0">
            Are your background checks stuck in the past? Upgrade to a fast,
            smooth, safe screening experience.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Hero cards sections */}
        <div className="z-10">{/* <HeroCards /> */}</div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
    </div>
  );
};
