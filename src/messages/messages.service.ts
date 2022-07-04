import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto, EditMessageDto } from './dto/dto';

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

  // PATCH
  async editMessage(userId: number, id: number, dto: EditMessageDto) {
    const existingMessage = await this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });

    if (existingMessage.userId !== userId || !existingMessage)
      throw new ForbiddenException('Access denied');

    const message = await this.prisma.message.update({
      where: {
        id: id,
      },
      data: {
        message: dto.message,
      },
    });

    return message;
  }

  // DELETE
  async deleteMessage(userId: number, id: number) {
    const message = await this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });
    if (message.userId !== userId || !message)
      throw new ForbiddenException('Access denied');

    return await this.prisma.message.delete({
      where: {
        id: id,
      },
    });
  }
}
