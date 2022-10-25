import { IsString } from 'class-validator'

export class ReferralDto {
	@IsString()
	code: string

	@IsString()
	type: string

	@IsString()
	description: string
}
