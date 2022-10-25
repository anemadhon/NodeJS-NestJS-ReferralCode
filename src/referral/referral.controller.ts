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
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

@ApiInternalServerErrorResponse({ description: `when server goes wrong` })
@ApiTags('referrals')
@Controller({ path: 'referrals', version: '1' })
export class ReferralController {
	constructor(private readonly referralService: ReferralService) {}

	@ApiCreatedResponse({
		description: `when user added referral code successfully`,
	})
	@ApiBadRequestResponse({
		description: `when the request wrong or not passed validation`,
	})
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiBearerAuth()
	@Post()
	create(@ClientFrom() clientFrom: string, @Body() body: ReferralDto) {
		const payload = { clientFrom, ...body }
		return this.referralService.create(payload)
	}

	@ApiOkResponse({ description: `when referral code listed successfully` })
	@Get()
	findAll() {
		return this.referralService.findAll()
	}

	@ApiOkResponse({
		description: `when single referral code listed successfully`,
	})
	@ApiNotFoundResponse({
		description: `when data not found`,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.referralService.findOne(id)
	}

	@ApiOkResponse({
		description: `when single referral code updated successfully`,
	})
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiForbiddenResponse({
		description: `when user try to access referral code that doesn't belong to him`,
	})
	@ApiNotFoundResponse({
		description: `when data not found`,
	})
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

	@ApiNoContentResponse({
		description: `when single referral code deleted successfully`,
	})
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiForbiddenResponse({
		description: `when user try to access referral code that doesn't belong to him`,
	})
	@ApiNotFoundResponse({
		description: `when data not found`,
	})
	@ApiBearerAuth()
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.referralService.remove(id)
	}
}
