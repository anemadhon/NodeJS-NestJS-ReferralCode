import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Me = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const { user } = ctx.switchToHttp().getRequest()

		return user.id
	}
)
