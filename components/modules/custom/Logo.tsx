import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link id="logo" href="/" className="flex gap-4 items-center justify-center w-max">
     {/* <Image
        src="/assets/images/logo.svg"
        width="50"
        height="50"
        alt="logo"
      /> */}
      <h2 data-testid="carrefour" className="hidden font-extrabold lg:flex text-[20px]  tracking-tigh mt-1 text-primary-900 antialiased">
        DQ Stores
      </h2>
    </Link>
  );
}