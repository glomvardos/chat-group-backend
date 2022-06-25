import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateMessageDto } from './dto/dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post('create-message')
  createMessage(@GetUser('id') userId: number, @Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(userId, dto);
  }

  @Get('channel-messages/:channelId')
  getChannelMessages(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.messagesService.getChannelMessages(channelId);
  }
}
