import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { TUser } from 'src/users/transforms/user.transform';
import { IRequestAuth } from '../interfaces';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IRequestAuth = ctx.switchToHttp().getRequest()
    const student = request.user.user;
    console.log(request.user)
    return plainToClass(TUser, student)
  },
)