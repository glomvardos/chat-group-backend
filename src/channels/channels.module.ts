import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channels.contoller';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
