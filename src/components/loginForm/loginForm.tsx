"use client";
import React from "react";

import { Form } from "../ui/form";
import RHFInput from "../shared/form/formInput";
import RHFPasswordInput from "../shared/form/formPassword";
import { loginSchema, LoginType } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SubmitButton from "../shared/submitButtom/submitButton";
import { signIn } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function loginHandler(data: LoginType) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      showSuccessToast("Login Successful");
      redirect("/");
    } else {
      showErrorToast(response?.error || "Login failed");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(loginHandler)}>
          <RHFInput
            name="email"
            formLabel="Enter Your Email"
            placeHolder="Enter Your Email"
          />

          <RHFPasswordInput
            formLabel="Your Password"
            name="password"
            placeHolder="Enter Your Password"
          />
          <div className="w-full flex justify-center mt-4">
            <SubmitButton isSubmitting={isSubmitting} name="Login" />
          </div>
        </form>
      </Form>
    </div>
  );
}
