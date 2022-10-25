import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReferralDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	code: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string
}
