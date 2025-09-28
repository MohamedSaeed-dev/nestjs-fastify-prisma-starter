import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { Buffer } from 'buffer';
import { Observable } from 'rxjs';
import { IFile } from 'src/modules/files/interfaces/file.interface';
import { PassThrough } from 'stream';
import settings from '../config/configurations';

export function FastifyFileInterceptor(fieldName: string): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const parts = await request.parts();
      const fields: Record<string, any> = {};
      let uploadedFile: IFile | null = null;

      for await (const part of parts) {
        if (part.type === 'file' && part.fieldname === fieldName) {
          const originalname = part.filename;
          const filename =
            originalname.substring(0, originalname.lastIndexOf('.')) || originalname;

          if (!isValidFileName(filename)) {
            throw new BadRequestException('Invalid file name');
          }

          if (!settings.ALLOWED_FILE_TYPES?.split(',').includes(part.mimetype)) {
            throw new HttpException('Unsupported file type', 415);
          }

          const chunks: Buffer[] = [];
          let totalSize = 0;
          const sizeLimit = Number(settings.MAX_FILE_SIZE);

          const stream = new PassThrough();
          part.file.pipe(stream);

          for await (const chunk of stream) {
            totalSize += chunk.length;
            if (totalSize > sizeLimit) {
              throw new HttpException('File too large. Max is 100MB.', 413);
            }
            chunks.push(chunk);
          }

          uploadedFile = {
            originalname: filename,
            mimetype: part.mimetype,
            size: totalSize,
            buffer: Buffer.concat(chunks),
          };
        } else if (part.type === 'field') {
          fields[part.fieldname] = part.value;
        }
      }

      if (!uploadedFile) {
        throw new BadRequestException('File is required');
      }

      request.body = fields;
      request.file = uploadedFile;

      return next.handle();
    }
  }

  return mixin(MixinInterceptor);
}

function isValidFileName(name: string): boolean {
  const validNameRegex = /^[a-zA-Z0-9_.-]+$/;
  if (name.includes('..') || name.includes('/') || name.includes('\\')) return false;
  return validNameRegex.test(name);
}
