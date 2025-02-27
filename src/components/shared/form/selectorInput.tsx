import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

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

export default function RHFSelector<T extends FieldValues>({
  formLabel,
  name,
  placeHolder,
  variant,
  className,
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={field.value ? field.value : placeHolder}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
