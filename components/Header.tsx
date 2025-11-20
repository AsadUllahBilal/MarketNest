"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggle-theme";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "About",
    url: "/about"
  },
  {
    title: "Shop",
    url: "/shop"
  },
  {
    title: "Contact",
    url: "/contact"
  },
]

const Header = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  return (
    <header className="w-full h-[90px] dark:text-white flex items-center justify-between px-10">
      <Link href="/">
        <h1 className="text-2xl font-bold">MarketNest</h1>
      </Link>
      <div className="flex items-center justify-center gap-3">
        {navItems.map((item, index) => (
          <Link href={item.url} key={index}>
            <span className={`hover:text-red-500 transition-all duration-300 ${pathname === item.url ? "text-red-500" : ""}`}>{item.title}</span>
          </Link>
        ))}
        <ModeToggle />
        {isLoaded &&
          (user ? (
            <span className="font-medium">{user?.fullName || "User"}</span>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Link href="/auth/sign-up">
                <Button variant={"secondary"}>Sign Up</Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button variant={"link"}>Sign In</Button>
              </Link>
            </div>
          ))}
      </div>
    </header>
  );
};

export default Header;
