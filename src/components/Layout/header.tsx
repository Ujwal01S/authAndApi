import { getUserSession } from "@/app/api/auth/[...nextauth]/option";
import Link from "next/link";
import React from "react";
import UserContent from "./userContent";

const navigationItems = [
  { name: "Featured", href: "#" },
  { name: "All Event", href: "#" },
  { name: "Add Event", href: "#" },
];

export default async function Header() {
  const session = await getUserSession();
  // console.log(session);
  return (
    <header className="bg-purple-500 py-3 px-8 text-lg font-semibold ">
      <nav className="flex justify-between text-white cursor-pointer">
        <span>Home</span>
        <ul className="flex gap-4">
          {navigationItems.map((item, idx) => (
            <li key={idx} className="cursor-pointer text-white">
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
          <li className="cursor-pointer text-none">
            {session?.user ? (
              <UserContent
                email={session.user.email}
                id={session.user.id}
                image={session.user.image}
                name={session.user.name}
                role={session.user.role}
              />
            ) : (
              <Link href="signIn">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
