import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { IAuthPayload } from 'src/common/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate({ id }: IAuthPayload) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new UnauthorizedException('Invalid user token.');
    }
    return { user };
    // return { userId: payload.sub, username: payload.username };
  }
}
