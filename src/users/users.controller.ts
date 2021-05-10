import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/local-auth.guard';
import { UserRequest } from 'src/common/custom-decorator';
import { IMessage, IUserInfo } from 'src/common/interfaces';
import { UserService } from './services/user.service';
import { TUser } from './transforms/user.transform';
import { UpdateUserDto } from './dtos/user.dto';

@ApiTags('Users')
@Controller('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('Me')
  getUser(@UserRequest() user: TUser): IUserInfo {
    console.log();
    const userInfo = user.info();
    return userInfo;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('Profile')
  updateProfile(
    @UserRequest() user: TUser,
    @Body() data: UpdateUserDto,
  ): Promise<IMessage> {
    const userInfo = user.info();
    return this.userService.editMyProfile({
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.username,
      firstname: data.firstname,
      lastname: data.lastname,
    });
  }
}
