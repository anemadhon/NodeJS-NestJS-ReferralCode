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
import { ClientFrom } from './decorator/client.decorator';

@Controller('referrals')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(@ClientFrom() clientFrom: string, @Body() body: ReferralDto) {
    const payload = { clientFrom, ...body };
    return this.referralService.create(payload);
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
  update(
    @ClientFrom() clientFrom: string,
    @Param('id') id: string,
    @Body() body: ReferralDto,
  ) {
    const payload = {
      id,
      clientFrom,
      ...body,
    };

    return this.referralService.update(payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralService.remove(id);
  }
}
