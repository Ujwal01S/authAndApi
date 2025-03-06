import { UserType } from "@/types/user";
import React from "react";
import UserCard from "./userCard";

type UserTableType = {
  users: UserType[];
};

export default function UserTable({ users }: UserTableType) {
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user._id}
          _id={user._id}
          email={user.email}
          image={user.image}
          name={user.name}
          role={user.role}
        />
      ))}
    </div>
  );
}
