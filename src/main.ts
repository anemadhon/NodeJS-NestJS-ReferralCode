import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	app.setGlobalPrefix('api')
	app.enableVersioning({
		type: VersioningType.URI,
	})
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		})
	)

	const prismaService = app.get<PrismaService>(PrismaService)
	const appPort = app.get<ConfigService>(ConfigService).get<number>('APP_PORT')
	const appName = app.get<ConfigService>(ConfigService).get<string>('APP_NAME')
	const config = new DocumentBuilder()
		.setTitle(appName)
		.setDescription(`${appName} Documentations`)
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api/docs', app, document)

	await prismaService.enableShutdownHooks(app)
	await app.listen(appPort)
}
bootstrap()
