import { getUserSession } from "@/app/api/auth/[...nextauth]/option";
import Link from "next/link";
import React from "react";
import UserContent from "./userContent";

export default async function Header() {
  const session = await getUserSession();
  // console.log(session);
  return (
    <header className="bg-purple-500 py-3 px-8 text-lg font-semibold ">
      <nav className="flex justify-between text-white cursor-pointer">
        <Link href="/">Home</Link>
        <ul className="flex gap-4">
          <li className="cursor-pointer text-white">
            <Link href="#">Featured</Link>
          </li>

          <li className="cursor-pointer text-white">
            <Link href="#">All Event</Link>
          </li>
          {session?.user.role === "admin" && (
            <li className="cursor-pointer text-white">
              <Link href="/addEvent">Add Event</Link>
            </li>
          )}

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
