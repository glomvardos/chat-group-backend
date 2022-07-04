import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto, LeaveChannelDto } from './dto/dto';

@UseGuards(JwtGuard)
@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post('create-channel')
  createChannel(@GetUser('id') userId: number, @Body() dto: CreateChannelDto) {
    return this.channelService.createChannel(userId, dto);
  }

  @Get('channels')
  getChannels() {
    return this.channelService.getChannels();
  }

  @Get('channel/:id')
  getChannel(@Param('id', ParseIntPipe) id: number) {
    return this.channelService.getChannel(id);
  }

  @Get('user-channels')
  getUserChannels(@GetUser('id') userId: number) {
    return this.channelService.getUserChannels(userId);
  }

  @Delete('delete-channel/:id')
  deleteChannel(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.deleteChannel(userId, id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('join-channel/:id')
  joinChannel(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.joinChannel(userId, id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('leave-channel/:id')
  leaveChannel(
    @Body() userId: LeaveChannelDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.channelService.leaveChannel(userId, id);
  }
}
