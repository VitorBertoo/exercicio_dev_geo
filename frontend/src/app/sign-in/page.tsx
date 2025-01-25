"use client";

import { SignInForm } from "./components/signInForm";

export default function LoginPage() {
  return (
    <div className="self-center m-auto flex flex-col items-center min-w-[350px] bg-gray-900 p-6 rounded-md">
      <SignInForm />
    </div>
  );
}
