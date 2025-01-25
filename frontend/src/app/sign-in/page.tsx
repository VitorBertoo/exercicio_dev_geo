"use client";

import { useState } from "react";
import { SignInForm } from "./components/SignInForm";
import { SignUpForm } from "./components/SignUpForm";

export default function LoginPage() {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <div className="self-center m-auto flex flex-col items-center min-w-[450px] bg-gray-900 p-6 rounded-md">
      {hasAccount ? <SignInForm /> : <SignUpForm />}
      <span
        onClick={toggleHasAccount}
        className="mx-auto mt-3 cursor-pointer hover:text-blue-500"
      >
        {hasAccount ? "Criar uma conta" : "Já tenho uma conta"}
      </span>
    </div>
  );
}
