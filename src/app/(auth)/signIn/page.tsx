import LoginForm from "@/components/loginForm/loginForm";
import React from "react";

export default function SignInPage() {
  return (
    <div className="container w-full mt-10 flex justify-center items-center h-[90vh]">
      <div className="flex flex-col w-[60%] shadow-lg px-8 py-4">
        <h2 className="text-2xl text-gray-600 text-center font-semibold">
          SignIn Form
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
