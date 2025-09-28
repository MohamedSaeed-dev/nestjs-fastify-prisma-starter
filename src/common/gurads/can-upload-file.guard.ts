import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/generated/client';
import { FastifyRequest } from 'fastify';
import { CreateFilesDto } from 'src/modules/files/dto/create-files.dto';
@Injectable()
export class CanUploadFileGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        // const request = context.switchToHttp().getRequest<FastifyRequest>();
        // const user = request['user'] as User;
        // const body = request.body as CreateFilesDto;
        // const files = body?.files ?? [];
        // const store = (user as any)?.store;
        // const subscription = store?.subscription?.[0];
        // if (!store || !subscription?.plan) {
        //     throw new ForbiddenException('You must subscribe to a plan.');
        // }
        // const maxStorage = Number(subscription.plan.maxStorage ?? 0);
        // const currentStorageUsage = Number(store.storageUsed ?? 0);
        // const filesSizeMB = files.reduce((acc, file) => {
        //     return acc + Number((file.size / (1024 * 1024)).toFixed(2));
        // }, 0);
        // if (currentStorageUsage + filesSizeMB > maxStorage) {
        //     throw new ForbiddenException(
        //         `Storage limit exceeded: ${(currentStorageUsage + filesSizeMB).toFixed(2)}/${maxStorage} MB.`,
        //     );
        // }
        return true;
    }
}
