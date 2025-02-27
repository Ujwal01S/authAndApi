"use client";
import { cva } from "class-variance-authority";
import React, { useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder: string;
  variant?: "default" | "single";
} & React.InputHTMLAttributes<HTMLInputElement>;

const inputFieldVariants = cva("", {
  variants: {
    variant: {
      default: "w-full",
      single: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function RHFPasswordInput<T extends FieldValues>({
  formLabel,
  name,
  placeHolder,
  className,
  variant,
}: Props<T>) {
  const { control } = useFormContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(inputFieldVariants({ variant, className }))}>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeHolder}
                {...field}
                type={isVisible ? "text" : "password"}
              />
              <button
                className="absolute top-2 right-2"
                type="button"
                onClick={() => setIsVisible((boolVal) => !boolVal)}
              >
                {isVisible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
