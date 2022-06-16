import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateChannelDto } from './dto/dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  // POST
  async createChannel(dto: CreateChannelDto) {
    try {
      const channel = await this.prisma.channel.create({
        data: {
          name: dto.name.toLowerCase(),
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

  // DELETE
  async deleteChannel(id: string) {
    const existingChannel = await this.prisma.channel.findUnique({
      where: {
        id: +id,
      },
    });

    if (!existingChannel) throw new NotFoundException('Channel not found');

    const channel = await this.prisma.channel.delete({
      where: {
        id: +id,
      },
    });

    return channel;
  }
}
