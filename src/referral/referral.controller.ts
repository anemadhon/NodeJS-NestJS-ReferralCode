import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { ReferralService } from './referral.service'
import { ReferralDto } from './dto/referral.dto'
import { ClientFrom } from './decorator/client.decorator'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('referrals')
@Controller({ path: 'referrals', version: '1' })
export class ReferralController {
	constructor(private readonly referralService: ReferralService) {}

	@ApiBearerAuth()
	@Post()
	create(@ClientFrom() clientFrom: string, @Body() body: ReferralDto) {
		const payload = { clientFrom, ...body }
		return this.referralService.create(payload)
	}

	@Get()
	findAll() {
		return this.referralService.findAll()
	}

	@ApiBearerAuth()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.referralService.findOne(id)
	}

	@ApiBearerAuth()
	@Patch(':id')
	update(
		@ClientFrom() clientFrom: string,
		@Param('id') id: string,
		@Body() body: ReferralDto
	) {
		const payload = {
			id,
			clientFrom,
			...body,
		}

		return this.referralService.update(payload)
	}

	@ApiBearerAuth()
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.referralService.remove(id)
	}
}
