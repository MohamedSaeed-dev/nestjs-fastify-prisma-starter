import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/generated/client';
import { FastifyRequest } from 'fastify';

@Injectable()
export class CanCreateProductGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // const request = context.switchToHttp().getRequest<FastifyRequest>();
        // const user = request['user'] as User;

        // const store = (user as any)?.store;
        // const subscription = store?.subscription?.[0];

        // if (!store || !subscription?.plan) {
        //     throw new ForbiddenException('You must subscribe to a plan.');
        // }

        // const maxProducts = subscription.plan.maxProducts ?? 0;
        // const currentProductsCount = (store.productsCount ?? 0) + 1;

        // if (currentProductsCount > maxProducts && maxProducts !== -1) {
        //     throw new ForbiddenException(
        //         `Product limit exceeded: ${currentProductsCount}/${maxProducts}`,
        //     );
        // }

        return true;
    }
}
