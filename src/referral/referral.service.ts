import { Injectable } from '@nestjs/common';
import { ReferralDto } from './dto/referral.dto';

@Injectable()
export class ReferralService {
  create(ReferralDto: ReferralDto) {
    return 'This action adds a new referral';
  }

  findAll() {
    return `This action returns all referral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referral`;
  }

  update(id: number, ReferralDto: ReferralDto) {
    return `This action updates a #${id} referral`;
  }

  remove(id: number) {
    return `This action removes a #${id} referral`;
  }
}
