import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: UserDto) {
    const data = {
      ...body,
      id: `user-${nanoid(16)}`,
      password: await argon.hash(body.password),
    };

    const user = await this.prisma.users.create({ data, select: { id: true } });

    return { message: '', result: user };
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });

    return { message: '', result: user };
  }
}
