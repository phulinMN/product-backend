import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './auth.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { IAccessToken, UserLoginDto } from 'src/users/user.dto';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('Register')
  async register(@Body() data: RegisterUserDto): Promise<any> {
    return await this.authService.userRegister(data);
  }

  @Post('Login')
  async login(@Body() data: UserLoginDto): Promise<IAccessToken> {
    return await this.authService.userLogin(data);
  }
}
