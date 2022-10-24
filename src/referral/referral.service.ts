import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReferralDto } from './dto/referral.dto';

@Injectable()
export class ReferralService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: { clientFrom: string } & ReferralDto) {
    const unixTimestamp = Date.now();
    const data = {
      id: `referral-code-${nanoid(16)}`,
      code: payload.code.toUpperCase(),
      type: payload.type.toUpperCase(),
      description: payload.description.toUpperCase(),
      createdBy: 'user-YNcYj0r5_jaGBfBl',
      createdAt: unixTimestamp,
      updatedAt: unixTimestamp,
      createdFrom: payload.clientFrom,
      updatedFrom: payload.clientFrom,
    };

    const referral = await this.prisma.referrals.create({
      data,
      select: { id: true },
    });

    return { message: '', result: referral };
  }

  async findAll() {
    return { message: '', result: await this.prisma.referrals.findMany() };
  }

  async findOne(id: string) {
    return {
      message: '',
      result: await this.prisma.referrals.findUnique({ where: { id } }),
    };
  }

  async update(payload: { id: string; clientFrom: string } & ReferralDto) {
    const referral = await this.findOne(payload.id);
    const unixTimestamp = Date.now();
    const data = {
      id: `referral-code-${nanoid(16)}`,
      code: payload.code.toUpperCase(),
      type: payload.type.toUpperCase(),
      description: payload.description.toUpperCase(),
      updatedAt: unixTimestamp,
      updatedFrom: payload.clientFrom,
      createdBy: referral.result.createdBy,
      createdAt: referral.result.createdAt,
      createdFrom: referral.result.createdFrom,
    };

    const updatedReferral = await this.prisma.referrals.update({
      where: { id: payload.id },
      data,
      select: { id: true },
    });

    return { message: '', result: updatedReferral };
  }

  async remove(id: string) {
    const referral = await this.findOne(id);
    const deletedReferral = await this.prisma.referrals.delete({
      where: { id },
      select: { id: true },
    });

    return { message: '', result: deletedReferral };
  }
}
