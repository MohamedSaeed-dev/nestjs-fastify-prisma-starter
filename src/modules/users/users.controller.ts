import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { CurrentUser, CurrentUserType } from 'src/common/decorators/current-user.decorator';
import { RequiredRoles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/generated/enums';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @RequiredRoles(UserRole.ADMIN)
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get('profile')
  findProfile(@CurrentUser() user: CurrentUserType) {
    return this.usersService.findProfile(user);
  }

  @Patch('profile')
  updateProfile(@CurrentUser() user: CurrentUserType, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(user, updateProfileDto);
  }
}
