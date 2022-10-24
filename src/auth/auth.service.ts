import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ username, password }: AuthDto) {
    const user = await this.prisma.users.findFirst({ where: { username } });
    if (!user) {
      return {};
    }
    const isPasswordMatches = await argon.verify(user.password, password);
    if (!isPasswordMatches) {
      return {};
    }
    //generate jwt
    return { message: '', result: '' };
  }
}
