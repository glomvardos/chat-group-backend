import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateChannelDto } from './dto/dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}
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
}
