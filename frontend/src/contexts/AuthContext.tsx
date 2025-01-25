"use client";

import { AuthUser } from "@/interfaces/user";
import { signIn, UserSignIn } from "@/lib/api/authentication";
import { getCookie } from "@/lib/helpers/cookieHelpers/getCookie";
import { removeCookie } from "@/lib/helpers/cookieHelpers/removeCookie";
import { setCookie } from "@/lib/helpers/cookieHelpers/setCookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthContextProvider {
  children: React.ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  authUser: (credentials: UserSignIn) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProvider) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const authorization = getCookie({ key: "authorization" });

    if (authorization) setUser(JSON.parse(authorization) as AuthUser);

    setLoading(false);
  }, []);

  // tive que colocar um nome diferente pra não ter conflito com o signIn :c
  async function authUser({ email, password }: UserSignIn) {
    try {
      const response = await signIn({ email, password });

      const token = response.token;

      if (token) {
        setUser(response);
        setCookie({ key: "authorization", value: token });
        router.push("/map");
      }
    } catch (error) {
      console.error("erro", error);
    }
  }

  async function signOut() {
    setUser(null);
    removeCookie({ key: "authorization" });
    router.push("/sign-in");
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isAuthenticated: !!user?.token,
        signOut,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
