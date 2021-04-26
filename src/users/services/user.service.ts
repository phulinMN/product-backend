import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IAccessToken, RegisterUserDto, UserLoginDto } from '../user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(data: RegisterUserDto) {
    let user = await this.userRepository.findOne({ email: data.email });
    if (user) {
      // TODO: throw error
      return;
    }
    user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async login({ email, password }: UserLoginDto): Promise<IAccessToken> {
    const user = await this.userRepository.findOne({ email });
    // TODO: jwt
    return { accessToken: '123123' };
  }

  async verify(findCondition: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...findCondition },
    })
    if (!user) {
      throw new NotFoundException('not found user')
    }
    return user
  }
}
