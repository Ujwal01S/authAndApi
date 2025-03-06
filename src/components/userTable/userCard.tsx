import { UserType } from "@/types/user";
import React from "react";
import DeleteButton from "./deleteButton";

export default function UserCard({ name, email, role, _id }: UserType) {
  return (
    <div className="w-full flex flex-col border-b-[1px] border-black gap-2">
      <p>{name}</p>
      <p>{role}</p>
      <p>{email}</p>
      {role !== "admin" ? <DeleteButton id={_id} /> : <p>Admin no delete</p>}
    </div>
  );
}
