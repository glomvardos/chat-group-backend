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
    const channels = await this.prisma.channel.findMany({
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

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

  // PATCH
  async joinChannel(userId: number, id: number) {
    const existingChannel = await this.prisma.channel.findUnique({
      where: {
        id: id,
      },
    });

    if (existingChannel.channelOwner === userId)
      throw new ForbiddenException('You cannot join your own channel');

    if (!existingChannel)
      throw new ForbiddenException('Channel does not exist');

    const channel = await this.prisma.channel.update({
      where: {
        id: id,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return channel;
  }

  async leaveChannel(userId: number, id: number) {
    const existingChannel = await this.prisma.channel.findUnique({
      where: {
        id: id,
      },
    });

    if (existingChannel.channelOwner === userId)
      throw new ForbiddenException('You cannot leave your own channel');

    if (!existingChannel)
      throw new ForbiddenException('Channel does not exist');

    const channel = await this.prisma.channel.update({
      where: {
        id: id,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return channel;
  }
}
