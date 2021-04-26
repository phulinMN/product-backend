import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/user.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('Register')
  async register(@Body() data: RegisterUserDto): Promise<any> {
    return await this.authService.userRegister(data);
  }
}
