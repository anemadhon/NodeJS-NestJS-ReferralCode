import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import {
	ApiTags,
	ApiOkResponse,
	ApiInternalServerErrorResponse,
	ApiBadRequestResponse,
	ApiForbiddenResponse,
} from '@nestjs/swagger'

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOkResponse({ description: `when user logged in successfully` })
	@ApiBadRequestResponse({
		description: `when the request wrong or not passed validation`,
	})
	@ApiForbiddenResponse({ description: `when credentials not matched` })
	@ApiInternalServerErrorResponse({ description: `when server goes wrong` })
	@HttpCode(200)
	@Post('login')
	create(@Body() payload: AuthDto) {
		return this.authService.create(payload)
	}
}
