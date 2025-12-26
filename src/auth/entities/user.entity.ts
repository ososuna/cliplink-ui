export enum Provider {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
}

export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
    public provider: Provider | null,
  ) {}
}
