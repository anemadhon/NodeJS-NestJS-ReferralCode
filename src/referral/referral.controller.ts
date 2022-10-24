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

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(@Body() ReferralDto: ReferralDto) {
    return this.referralService.create(ReferralDto);
  }

  @Get()
  findAll() {
    return this.referralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ReferralDto: ReferralDto) {
    return this.referralService.update(+id, ReferralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralService.remove(+id);
  }
}
