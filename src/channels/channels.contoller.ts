import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/dto';

@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post('create-channel')
  createChannel(@Body() dto: CreateChannelDto) {
    return this.channelService.createChannel(dto);
  }

  @Get('channels')
  getChannels() {
    return this.channelService.getChannels();
  }

  @Delete('delete-channel/:id')
  deleteChannel(@Param('id') id: string) {
    return this.channelService.deleteChannel(id);
  }
}
