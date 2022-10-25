import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ClientFrom = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()

		return `${request.ip} / ${request.headers['user-agent']}`
	}
)
