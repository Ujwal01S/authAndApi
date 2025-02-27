import { getUserSession } from "@/app/api/auth/[...nextauth]/option";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface UserCardProps {
  className?: string;
}

export default async function UserCard({ className }: UserCardProps) {
  const session = await getUserSession();
  return (
    <div
      className={cn("border-b-[1px] border-slate-300 w-full py-3", className)}
    >
      <div className="flex gap-2">
        <span className="w-5 h-5 rounded-2xl relative">
          {session?.user && session.user.image && (
            <Image
              src={session?.user.image}
              alt={session?.user.name}
              fill
              className="rounded-full"
            />
          )}
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-sm">{session?.user.name}</p>
          <p className="text-sm">{session?.user.email}</p>
          <p className="text-sm">{session?.user.role}</p>
        </div>
      </div>
    </div>
  );
}
