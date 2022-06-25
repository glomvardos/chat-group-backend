import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // POST
  async createMessage(userId: number, dto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        message: dto.message,
        channelId: dto.channelId,
        userId: userId,
      },
    });

    return message;
  }

  // GET
  async getChannelMessages(channelId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return messages;
  }
}
