import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @ValidateIf(({ firstname }) =>  !firstname)
  @IsString()
  @IsNotEmpty()
  firstname!: string

  @ApiPropertyOptional()
  @ValidateIf(({ lastname }) => !lastname)
  @IsString()
  @IsNotEmpty()
  lastname!: string
}