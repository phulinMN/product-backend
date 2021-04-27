import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @ValidateIf(({ firstname }) => firstname !== undefined)
  @IsString()
  @IsNotEmpty()
  firstname?: string

  @ApiPropertyOptional()
  @ValidateIf(({ lastname }) => lastname !== undefined)
  @IsString()
  @IsNotEmpty()
  lastname?: string
}