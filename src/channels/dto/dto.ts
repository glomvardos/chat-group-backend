import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class LeaveChannelDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
