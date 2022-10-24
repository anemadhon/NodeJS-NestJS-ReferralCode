import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralDto } from './dto/referral.dto';

@Controller('referrals')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(@Body() body: ReferralDto) {
    return this.referralService.create(body);
  }

  @Get()
  findAll() {
    return this.referralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: ReferralDto) {
    const payload = {
      id,
      ...body,
    };

    return this.referralService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralService.remove(id);
  }
}
