import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsInt()
  channelId: number;
}
export class EditMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
