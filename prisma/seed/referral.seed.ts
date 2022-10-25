import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import * as argon from 'argon2'

const prisma = new PrismaClient()

export async function referralSeeder() {
	const password = await argon.hash('password')
	const user = await prisma.users.create({
		data: {
			id: `user-${nanoid(16)}`,
			name: 'Third Operation Staff',
			username: 'third_staff_seeder',
			password,
		},
	})
	const unixTimestamp = Date.now()
	const clientFrom = '127.0.0.1 / PostmanRuntime/7.29.2'
	const data = {
		id: `referral-code-${nanoid(16)}`,
		code: 'AHHA',
		type: 'RANDOM CODE 1',
		description: 'RANDOM CODE 1 SEEDING',
		createdAt: unixTimestamp,
		updatedAt: unixTimestamp,
		createdFrom: clientFrom,
		updatedFrom: clientFrom,
		createdBy: user.id,
	}

	await prisma.referrals.create({ data })
}
