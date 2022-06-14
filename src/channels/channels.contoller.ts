import { Body, Controller, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/dto';

@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post('create-channel')
  createChannel(@Body() dto: CreateChannelDto) {
    return this.channelService.createChannel(dto);
  }
}
