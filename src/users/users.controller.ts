import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { RegisterUserDto } from './user.dto';

@ApiTags('Users')
@Controller('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() data: RegisterUserDto) {
    return this.userService.registerUser(data);
  }

  @Get('/Me')
  async getMyProfile() {
    // return this.userService.registerUser(data);
  }
}
