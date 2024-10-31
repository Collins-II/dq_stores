"use client";
import { IRootState } from "@/store";
import { FolderKanban, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaOpencart, FaRegFolderOpen } from "react-icons/fa";
import { SiHomeadvisor } from "react-icons/si";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function MobileBottom() {
  const { cart } = useSelector((state: IRootState) => ({ ...state }));
  return (
    <div className="bg-white z-[1000] w-full flex border-t border-t-gray-300 h-20 px-10 fixed shadow-md bottom-0 left-0 lg:hidden">
      <div className="flex items-cente justify-center gap-8 w-full">
        <Link
          href="/products"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <FaRegFolderOpen className="h-6 w-6 group-hover:text-primary-900 group-hover:font-bold" />
          <span className="font-semibold">Categories</span>
        </Link>
        <Link
          href="/"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <SiHomeadvisor className="h-6 w-6 group-hover:text-primary-900 group-hover:font-bold" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link
          href="/cart"
          className="group relative flex flex-col gap-1 items-center justify-center"
        >
          <div className="relative" id="openCart">
              <span className="absolute rounded-full flex justify-center items-center -top-2 left-1 bg-red-500 text-base text-white w-5 h-5">
                {cart.cartItems.length}
              </span>
              <FaOpencart className="h-6 w-6" />
            </div>
          <span className="font-semibold">Cart</span>
        </Link>
        <Link
          href="/signin"
          className="group flex flex-col gap-1 items-center justify-center"
        >
          <RiAccountPinCircleFill className="h-6 w-6 group-hover:text-primary-900 group-hover:font-bold" />
          <span className="font-semibold">Account</span>
        </Link>
      </div>
    </div>
  );
}
