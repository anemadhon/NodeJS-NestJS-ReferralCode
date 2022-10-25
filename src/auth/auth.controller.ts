import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiInternalServerErrorResponse,
	ApiBadRequestResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiInternalServerErrorResponse({ description: `when server goes wrong` })
@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOkResponse({ description: `when user logged in successfully` })
	@ApiBadRequestResponse({
		description: `when the request wrong or not passed validation`,
	})
	@ApiForbiddenResponse({ description: `when credentials not matched` })
	@HttpCode(200)
	@Post('login')
	create(@Body() payload: AuthDto) {
		return this.authService.create(payload)
	}

	@ApiNoContentResponse({ description: `when user logged out successfully` })
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiBearerAuth()
	@HttpCode(204)
	@Post('logout')
	logout() {
		return this.authService.logout()
	}
}
