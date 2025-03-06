"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import RHFInput from "../shared/form/formInput";
import RHFImageInput from "../shared/form/imageInput";
import SubmitButton from "../shared/submitButtom/submitButton";
import { RegisterFormType, registerSchema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "@/lib/api";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import RHFSelector from "../shared/form/selectorInput";

export default function RegisterForm() {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      image: undefined,
      role: "",
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const registerUser = async (data: RegisterFormType) => {
    // console.log({ data });

    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch(`${baseUrl}/api/registerUser`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log({ responseData });
      if (response.ok) {
        showSuccessToast("Success");
        console.log("Ok:", responseData);
        form.reset();
      }
      if (!response.ok) {
        showErrorToast("Failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(registerUser)}>
          <RHFInput name="name" placeHolder="Your Name" formLabel="Name" />
          <RHFInput name="email" placeHolder="Your Email" formLabel="Email" />
          <RHFInput
            name="password"
            placeHolder="Your Password"
            formLabel="Password"
          />

          <RHFSelector
            name="role"
            formLabel="Select Role"
            placeHolder="Select a role"
          />

          <RHFImageInput name="image" formLabel="Add Image" />
          <div className="w-full flex justify-center mt-6">
            <SubmitButton isSubmitting={isSubmitting} name="Register" />
          </div>
        </form>
      </Form>
    </div>
  );
}
