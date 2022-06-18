import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateChannelDto } from './dto/dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  // POST
  async createChannel(userId: number, dto: CreateChannelDto) {
    try {
      const channel = await this.prisma.channel.create({
        data: {
          name: dto.name.toLowerCase(),
          channelOwner: userId,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return channel;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Channel name already exists');
        }
      }
      throw error;
    }
  }

  // GET
  async getChannels() {
    const channels = await this.prisma.channel.findMany();

    return channels;
  }

  async getUserChannels(userId: number) {
    const channels = await this.prisma.channel.findMany({
      where: {
        channelOwner: userId,
      },
    });

    return channels;
  }

  // DELETE
  async deleteChannel(userId: number, id: number) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: id,
      },
    });

    if (!channel || channel.channelOwner !== userId)
      throw new ForbiddenException('Access to resource denied');

    await this.prisma.channel.delete({
      where: {
        id: id,
      },
    });
  }
}
