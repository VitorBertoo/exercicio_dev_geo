import { destroyCookie } from "nookies";

interface RemoveCookieProps {
  key: string;
}

export const removeCookie = ({ key }: RemoveCookieProps) => {
  return destroyCookie(null, key, { path: "/" });
};
