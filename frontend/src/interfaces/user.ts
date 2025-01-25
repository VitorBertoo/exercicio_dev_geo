export interface User {
  name: string;
  email: string;
}

export interface AuthUser {
  user: User;
  token: string;
}
