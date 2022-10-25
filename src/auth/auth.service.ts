import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto/auth.dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}
	async create({ username, password }: AuthDto) {
		const user = await this.prisma.users.findFirst({ where: { username } })

		if (!user) {
			return {}
		}

		const isPasswordMatches = await argon.verify(user.password, password)

		if (!isPasswordMatches) {
			return {}
		}

		const token = {
			type: 'Bearer',
			accessToken: this.generateToken(user.id, {
				expiresIn: '2m',
				secret: 'access',
			}),
			refreshToken: this.generateToken(user.id, {
				expiresIn: '2m',
				secret: 'refresh',
			}),
		}

		const addedToken = await this.addToken(await token.refreshToken)

		if (!addedToken.token) {
			return {}
		}

		return { message: '', result: token }
	}

	private generateToken(
		id: string,
		options: { expiresIn: string; secret: string }
	): Promise<string> {
		return this.jwt.signAsync({ sub: id }, options)
	}

	private async addToken(token: string) {
		return await this.prisma.authentications.create({
			data: { token },
			select: { token: true },
		})
	}
}
