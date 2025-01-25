import { setCookie as setNookie } from "nookies";
import { getCookie } from "./getCookie";
import { removeCookie } from "./removeCookie";

interface SetCookieProps {
  key: string;
  value: string;
  expires?: number;
}

export const setCookie = ({ key, value, expires }: SetCookieProps) => {
  const cookieExists = getCookie({ key });
  if (cookieExists) {
    removeCookie({ key });
  }

  const maxAge = expires || 60 * 60 * 24;
  const options = {
    maxAge,
    path: "/",
  };
  setNookie(null, key, value, options);
};
