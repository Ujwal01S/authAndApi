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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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

export default function RHFInput<T extends FieldValues>({
  formLabel,
  name,
  placeHolder,
  className,
  variant,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(inputFieldVariants({ variant, className }))}>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <Input placeholder={placeHolder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
