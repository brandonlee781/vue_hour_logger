export interface IAuthCookie {
  _id?: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}