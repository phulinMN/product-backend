import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}

export class IAccessToken {
  accessToken: string;
}
