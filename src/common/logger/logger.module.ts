import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './winston.config';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerConfig)],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule {}
