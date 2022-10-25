import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiInternalServerErrorResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiInternalServerErrorResponse({ description: `when server goes wrong` })
@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiCreatedResponse({ description: `when user registered successfully` })
	@ApiBadRequestResponse({
		description: `when the request wrong or not passed validation`,
	})
	@Post('register')
	create(@Body() body: UserDto) {
		return this.userService.create(body)
	}

	@ApiOkResponse({ description: `when user authenticated` })
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id)
	}
}
