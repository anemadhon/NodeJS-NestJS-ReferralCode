import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReferralDto {
	@ApiProperty()
	@IsString()
	code: string

	@ApiProperty()
	@IsString()
	type: string

	@ApiProperty()
	@IsString()
	description: string
}
