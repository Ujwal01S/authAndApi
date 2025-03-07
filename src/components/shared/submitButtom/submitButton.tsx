import { cn } from "@/lib/utils";
import React from "react";

type SubmitButtonType = {
  name: string;
  className?: string;
  isSubmitting: boolean;
};

export default function SubmitButton({
  name,
  className,
  isSubmitting,
}: SubmitButtonType) {
  return (
    <>
      {isSubmitting ? (
        <button
          className={cn(
            "w-fit bg-slate-700 text-white font-semibold px-4 py-2 rounded-md",
            className
          )}
        >
          {name}...
        </button>
      ) : (
        <button
          className={cn(
            "w-fit bg-blue-700 text-white font-semibold px-4 py-2 rounded-md",
            className
          )}
        >
          {name}
        </button>
      )}
    </>
  );
}
