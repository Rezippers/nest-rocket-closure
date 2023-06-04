import {ExecutionContext, createParamDecorator} from '@nestjs/common';

import {User} from "../modules/users/users.entity";

export const RequestUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as User;
    },
);
