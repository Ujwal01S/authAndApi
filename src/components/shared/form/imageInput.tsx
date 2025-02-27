"use client";
import { cva } from "class-variance-authority";
import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  placeHolder?: string;
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

export default function RHFImageInput<T extends FieldValues>({
  formLabel,
  name,
  placeHolder,
  className,
  variant,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <div>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className={cn(inputFieldVariants({ variant, className }))}>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeHolder}
                type="file"
                accept="image/jpeg"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    field.onChange(file);
                  } else {
                    field.onChange(e);
                  }
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
