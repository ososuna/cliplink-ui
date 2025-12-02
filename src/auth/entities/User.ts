export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string[];
  password?: string;
  img?: string;
  githubId?: string;
  googleId?: string;
}
