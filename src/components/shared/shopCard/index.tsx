import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ShopCardProps {
  className?: string;
  image: string;
  name: string;
  phone: string;
  description: string;
}

export default function ShopCard({
  className,
  image,
  name,
  phone,
  description,
}: ShopCardProps) {
  return (
    <div
      className={cn(
        "shadow-md px-4 flex flex-col gap-2 py-3 border-[1px] border-black",
        className
      )}
    >
      <div className="h-[250px] relative">
        <Image src={image[0]} alt={name} fill sizes="100vh" />
      </div>

      <span className="flex justify-between">
        <h1>{name}</h1>
        <p>{phone}</p>
      </span>

      <p>{description}</p>
    </div>
  );
}
