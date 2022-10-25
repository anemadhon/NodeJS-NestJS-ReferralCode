import {
	Injectable,
	ForbiddenException,
	NotFoundException,
} from '@nestjs/common'
import { nanoid } from 'nanoid'
import { PrismaService } from 'src/prisma/prisma.service'
import { tryCatchErrorHandling } from 'src/response.filter'
import { ReferralDto } from './dto/referral.dto'

@Injectable()
export class ReferralService {
	constructor(private readonly prisma: PrismaService) {}

	async create(payload: { clientFrom: string; id: string } & ReferralDto) {
		const unixTimestamp = Date.now()
		const data = {
			id: `referral-code-${nanoid(16)}`,
			code: payload.code.toUpperCase(),
			type: payload.type.toUpperCase(),
			description: payload.description.toUpperCase(),
			createdBy: payload.id,
			createdAt: unixTimestamp,
			updatedAt: unixTimestamp,
			createdFrom: payload.clientFrom,
			updatedFrom: payload.clientFrom,
		}

		const referral = await this.prisma.referrals
			.create({
				data,
				select: { id: true },
			})
			.catch(error => tryCatchErrorHandling(error))

		return { message: '', result: referral }
	}

	async findAll() {
		return {
			message: '',
			result: await this.prisma.referrals
				.findMany()
				.catch(error => tryCatchErrorHandling(error)),
		}
	}

	async findOne(id: string) {
		const referral = await this.prisma.referrals
			.findUnique({ where: { id } })
			.catch(error => tryCatchErrorHandling(error))

		if (!referral) {
			throw new NotFoundException('NotFoundException - Data Not Found')
		}

		return {
			message: '',
			result: referral,
		}
	}

	async update(
		payload: { id: string; owner: string; clientFrom: string } & ReferralDto
	) {
		const referral = await this.findOne(payload.id).catch(error =>
			tryCatchErrorHandling(error)
		)

		if (referral.result.createdBy !== payload.owner) {
			throw new ForbiddenException(
				'ForbiddenException - You are not allowed to this action'
			)
		}

		const unixTimestamp = Date.now()
		const data = {
			id: `referral-code-${nanoid(16)}`,
			code: payload.code.toUpperCase(),
			type: payload.type.toUpperCase(),
			description: payload.description.toUpperCase(),
			updatedAt: unixTimestamp,
			updatedFrom: payload.clientFrom,
			createdBy: payload.owner,
			createdAt: referral.result.createdAt,
			createdFrom: referral.result.createdFrom,
		}

		const updatedReferral = await this.prisma.referrals
			.update({
				where: { id: payload.id },
				data,
				select: { id: true },
			})
			.catch(error => tryCatchErrorHandling(error))

		return { message: '', result: updatedReferral }
	}

	async remove(payload: { id: string; owner: string }) {
		const referral = await this.findOne(payload.id).catch(error =>
			tryCatchErrorHandling(error)
		)

		if (referral.result.createdBy !== payload.owner) {
			throw new ForbiddenException(
				'ForbiddenException - You are not allowed to this action'
			)
		}

		const deletedReferral = await this.prisma.referrals
			.delete({
				where: { id: payload.id },
				select: { id: true },
			})
			.catch(error => tryCatchErrorHandling(error))

		return { message: '', result: deletedReferral }
	}
}
