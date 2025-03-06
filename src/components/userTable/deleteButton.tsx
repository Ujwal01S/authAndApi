"use client";

import { revalidateUsers } from "@/action/revalidate";
import { baseUrl } from "@/lib/api";
import React from "react";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/login/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await revalidateUsers("users");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <button className="bg-red-500 px-4 py-2" onClick={handleDelete}>
      Delete
    </button>
  );
}
