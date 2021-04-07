import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../user.dto';
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
}
