import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from '../base/pagination.dto';
import { LoggerService } from './logger.service';
import { RequiredRoles } from '../decorators/roles.decorator';
import { UserRole } from 'src/generated/enums';
@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}
  @Get()
  @RequiredRoles(UserRole.ADMIN)
  findAll(@Query() query: PaginationDto) {
    return this.loggerService.findAll(query);
  }
}
