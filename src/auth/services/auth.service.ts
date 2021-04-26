import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { RegisterUserDto } from 'src/users/user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  async userRegister(data: RegisterUserDto) {
    const { username, firstname, lastname, email, password } = data;
    const hashedPassword = hashSync(password, 12);
    let user = await this.userRepo.findOne({ email });
    if (user) {
      throw new UnprocessableEntityException('error user same email');
    }

    user = this.userRepo.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    user = await this.userRepo.save(user);
    return user;
  }
}
