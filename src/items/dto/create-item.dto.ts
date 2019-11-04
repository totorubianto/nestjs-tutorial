import { IsString, IsInt, IsEmail } from 'class-validator';
import { isNumber } from 'util';
export class CreateItemDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsEmail()
  readonly mail: string;
}
