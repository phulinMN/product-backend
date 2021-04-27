import { User } from "src/users/entities/user.entity";

export interface IUserIAuthPayload {
  user?: User
  accessToken?: string
}
export interface IRequestAuth extends Request {
  user: IUserIAuthPayload
  get: (param: string) => string
}

export interface IAuthPayload {
  id: number;
  token: string;
}