import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateMessageDto, EditMessageDto } from './dto/dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post('message')
  createMessage(@GetUser('id') userId: number, @Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(userId, dto);
  }

  @Get('channel-messages/:channelId')
  getChannelMessages(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.messagesService.getChannelMessages(channelId);
  }

  @Delete('message/:id')
  deleteMessage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messagesService.deleteMessage(userId, id);
  }

  @Patch('message/:id')
  editMessage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditMessageDto,
  ) {
    return this.messagesService.editMessage(userId, id, dto);
  }
}
