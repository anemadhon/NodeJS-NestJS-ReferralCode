import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ReferralDto } from './dto/referral.dto';

@Injectable()
export class ReferralService {
  create(body: ReferralDto) {
    const data = {
      ...body,
      id: `referral-code-${nanoid(16)}`,
      createdBy: '',
      createdAt: '',
      createdFrom: '',
    };

    return { data };
  }

  findAll() {
    return `This action returns all referral`;
  }

  findOne(id: string) {
    return `This action returns a #${id} referral`;
  }

  update(payload: { id: string } & ReferralDto) {
    return `This action updates a #${payload} referral`;
  }

  remove(id: string) {
    return `This action removes a #${id} referral`;
  }
}
