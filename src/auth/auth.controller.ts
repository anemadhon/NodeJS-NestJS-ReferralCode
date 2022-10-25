import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiInternalServerErrorResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LogoutDto } from './dto/logout.dto'
import { AuthGuard } from '@nestjs/passport'

@ApiInternalServerErrorResponse({ description: `when server goes wrong` })
@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOkResponse({ description: `when user logged in successfully` })
	@ApiBadRequestResponse({
		description: `when the request wrong or not passed validation`,
	})
	@ApiUnauthorizedResponse({ description: `when credentials not matched` })
	@HttpCode(200)
	@Post('login')
	create(@Body() payload: AuthDto) {
		return this.authService.create(payload)
	}

	@ApiNoContentResponse({ description: `when user logged out successfully` })
	@ApiUnauthorizedResponse({ description: `when user unauthenticated` })
	@ApiBearerAuth()
	@HttpCode(204)
	@UseGuards(AuthGuard('jwt'))
	@Post('logout')
	logout(@Body() payload: LogoutDto) {
		return this.authService.logout(payload)
	}
}
