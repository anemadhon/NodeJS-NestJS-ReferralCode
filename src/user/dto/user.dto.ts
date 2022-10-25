import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string
}
