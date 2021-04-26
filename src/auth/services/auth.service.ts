import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import {
  IAccessToken,
  RegisterUserDto,
  UserLoginDto,
} from 'src/users/user.dto';
import { compareSync, hashSync } from 'bcrypt';
import { UserService } from 'src/users/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
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

  async userLogin(data: UserLoginDto): Promise<IAccessToken> {
    const { email, password } = data;
    const user = await this.userService.verify({ email });

    // change hash algorithm
    const hash = user.password.replace(/^\$2y(.+)$/i, '$2a$1');

    const isValidPass = compareSync(password, hash);
    if (!isValidPass) {
      throw new UnauthorizedException('invalid password');
    }
    const jwt = await this.jwtService.sign({ id: user.id });
    return { accessToken: jwt };
    // return this.signStudentToken({ id: user.id, role: 'student' })
  }
}
