import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage, IUpdateUserInfo } from 'src/common/interfaces';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async verify(findCondition: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...findCondition },
    });
    if (!user) {
      throw new NotFoundException('not found user');
    }
    return user;
  }

  async editMyProfile(data: IUpdateUserInfo): Promise<IMessage> {
    const { id, firstname, lastname, email, username } = data;
    if (!lastname) {
      throw new NotFoundException('lastname not exits')
    }
    await this.userRepository.save({
      id,
      firstname,
      lastname,
      email,
      username,
    });
    return { message: 'success' }
  }
}
