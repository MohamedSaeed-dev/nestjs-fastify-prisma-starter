import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrentUserType } from 'src/common/decorators/current-user.decorator';
import { Hashing } from 'src/common/utils/hashing.util';
import { PrismaService } from 'src/core/database/prisma.service';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(query: QueryUserDto) {
    return await this.prismaService.prisma.user.findMany({
      skip: (query.offset - 1) * query.limit,
      take: query.limit,
    });
  }
  findProfile(user: CurrentUserType) {
    const { password, ...data } = user;
    return data;
  }
  async updateProfile(user: CurrentUserType, updateProfileDto: UpdateProfileDto) {
    const { oldPassword, newPassword, ...rest } = updateProfileDto;
    const userExist = await this.prismaService.prisma.user.findFirst({
      where: {
        OR: [{ email: updateProfileDto.email }, { username: updateProfileDto.username }],
      },
    });
    if (userExist && userExist.id !== user.id)
      throw new BadRequestException('email or username already exists');
    const data: any = { ...rest };
    if (oldPassword && newPassword) {
      await Hashing.compareOrFail(oldPassword, user.password, 'password is not correct');
      const hashedPassword = await Hashing.hash(newPassword);
      data.password = hashedPassword;
    }
    const updatedUser = await this.prismaService.prisma.user.update({
      where: { id: user.id },
      data: { ...data },
    });
    return updatedUser;
  }
}
