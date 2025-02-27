"use client";
import RegisterForm from "@/components/registerForm/registerForm";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="w-full container flex justify-center mt-20 ">
      <div className="w-[50%] shadow-lg py-4 px-8">
        <h2 className="text-2xl w-full text-center text-blue-700 font-semibold">
          Register Form
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
