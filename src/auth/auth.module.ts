import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './local-auth.guard';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
