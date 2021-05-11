import { IUserInfo } from '../../common/interfaces';
import { User } from '../entities/user.entity';

export class TUser {
  id: number;

  firstname: string;

  lastname: string;

  username: string;

  email: string;

  createdAt: Date;

  updatedAt: Date;

  users?: User[];

  info(): IUserInfo {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
    };
  }
}
