import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as winston from 'winston';
import { PaginationDto } from '../base/pagination.dto';
@Injectable()
export class LoggerService {
  private logger: winston.Logger;
  constructor() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
    });
  }
  private readonly logFilePath = join(__dirname, '../../../logs/error.log');
  async findAll(query: PaginationDto) {
    // Read the log file
    const data = await fs.readFile(this.logFilePath, 'utf-8');
    const entries = data
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp)));
    const totalEntries = entries.length;
    const totalPages = Math.ceil(totalEntries / query.limit);
    const startIndex = (query.offset - 1) * query.limit;
    const paginatedData = entries.slice(startIndex, startIndex + query.limit);
    return {
      data: paginatedData,
      total: totalEntries,
      page: query.offset,
      pageSize: query.limit,
      totalPages,
    };
  }
  log(message: string) {
    this.logger.info(message);
  }
}
