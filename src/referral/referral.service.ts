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
      creatorId: 'user-7GxxtTukpYIeEAkv',
      createdAt: unixTimestamp,
      updatedAt: unixTimestamp,
      createdFrom: payload.clientFrom,
      updatedFrom: payload.clientFrom,
    };

    const referral = await this.prisma.referrals.create({
      data,
      select: { id: true },
    });

    return { referral };
  }

  async findAll() {
    return { referrals: await this.prisma.referrals.findMany() };
  }

  async findOne(id: string) {
    return {
      referral: await this.prisma.referrals.findUnique({ where: { id } }),
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
      creatorId: referral.referral.creatorId,
      createdAt: referral.referral.createdAt,
      createdFrom: referral.referral.createdFrom,
    };

    const updatedReferral = await this.prisma.referrals.update({
      where: { id: payload.id },
      data,
      select: { id: true },
    });

    return { updatedReferral };
  }

  async remove(id: string) {
    const referral = await this.findOne(id);
    const deletedReferral = await this.prisma.referrals.delete({
      where: { id },
      select: { id: true },
    });

    return deletedReferral;
  }
}
