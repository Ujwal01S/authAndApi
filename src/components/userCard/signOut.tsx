"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutTag() {
  function handleLogOut() {
    signOut();
  }
  return (
    <button
      className="hover:text-red-600 text-sm w-full hover:bg-slate-200 text-start py-2"
      onClick={handleLogOut}
    >
      Log Out
    </button>
  );
}
