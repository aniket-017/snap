'use client'

import Link from "next/link";

export default function ChangePassword() {
  return (
    <div className="flex justify-center">
      <h1>
        <Link href="/" className="font-bold py-4 text-2xl lg:text-4xl">
          Snapcheck
        </Link>
      </h1>
    </div>
  );
}