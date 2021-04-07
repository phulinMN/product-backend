import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  firstname!: string;

  @ApiProperty()
  lastname!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}
