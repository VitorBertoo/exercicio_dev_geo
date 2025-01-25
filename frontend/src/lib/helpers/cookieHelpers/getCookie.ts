import { parseCookies } from "nookies";

interface GetCookieProps {
  key: string;
}

export const getCookie = ({ key }: GetCookieProps) => {
  const cookies = parseCookies();
  const cookie = cookies[key];
  return cookie;
};
