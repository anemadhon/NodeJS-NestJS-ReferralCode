import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import * as argon from 'argon2'

const prisma = new PrismaClient()

export async function userSeeder() {
	const password = await argon.hash('password')
	const data = [
		{
			id: `user-${nanoid(16)}`,
			name: 'Frist Operation Staff',
			username: 'first_staff_seeder',
			password,
		},
		{
			id: `user-${nanoid(16)}`,
			name: 'Second Operation Staff',
			username: 'second_staff_seeder',
			password,
		},
	]

	await prisma.users.createMany({ data })
}
