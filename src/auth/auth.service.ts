import {
	Injectable,
	UnauthorizedException,
	InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto/auth.dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { tryCatchErrorHandling } from 'src/response.filter'
import { LogoutDto } from './dto/logout.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly config: ConfigService
	) {}
	async create({ username, password }: AuthDto) {
		const user = await this.prisma.users
			.findFirst({ where: { username } })
			.catch(error => tryCatchErrorHandling(error))

		if (!user) {
			throw new UnauthorizedException(
				'UnauthorizedException - Credentials not matched'
			)
		}

		const isPasswordMatches = await argon.verify(user.password, password)

		if (!isPasswordMatches) {
			throw new UnauthorizedException(
				'UnauthorizedException - Credentials not matched'
			)
		}

		const token = {
			type: 'Bearer',
			accessToken: await this.generateToken(user.id, {
				expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRE'),
				secret: this.config.get<string>('JWT_ACCESS_SECRET'),
			}),
			refreshToken: await this.generateToken(user.id, {
				expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRE'),
				secret: this.config.get<string>('JWT_REFRESH_SECRET'),
			}),
		}

		const addedToken = await this.addToken(token.refreshToken)

		if (!addedToken.token) {
			throw new InternalServerErrorException('Internal Server Error')
		}

		return { message: '', result: token }
	}

	async logout(payload: LogoutDto) {
		const verifyToken = await this.verifyToken(payload.refreshToken)

		if (!verifyToken.token) {
			throw new UnauthorizedException(
				'UnauthorizedException - Please login to Continue'
			)
		}

		await this.deleteToken(payload.refreshToken)

		return { message: '', result: '' }
	}

	private generateToken(
		id: string,
		options: { expiresIn: string; secret: string }
	): Promise<string> {
		return this.jwt.signAsync({ sub: id }, options)
	}

	private async addToken(token: string) {
		return await this.prisma.authentications
			.create({
				data: { token },
				select: { token: true },
			})
			.catch(error => tryCatchErrorHandling(error))
	}

	private async verifyToken(token: string) {
		return await this.prisma.authentications
			.findFirst({ where: { token } })
			.catch(error => tryCatchErrorHandling(error))
	}

	private async deleteToken(token: string) {
		return await this.prisma.authentications
			.delete({ where: { token }, select: { token: true } })
			.catch(error => tryCatchErrorHandling(error))
	}
}
