import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrentUserType } from 'src/common/decorators/current-user.decorator';
import { Hashing } from 'src/common/utils/hashing.util';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    return `This action returns a user`;
  }
  async findAll(query: QueryUserDto) {
    return await this.prisma.client.user.findMany({
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
    const userExist = await this.prisma.client.user.findFirst({
      where: {
        OR: [{ email: updateProfileDto.email }, { username: updateProfileDto.username }],
      },
    });
    if (userExist && userExist.id !== user.id) throw new BadRequestException('email or username already exists');
    const data: any = { ...rest };
    if (oldPassword && newPassword) {
      await Hashing.compareOrFail(oldPassword, user.password, 'password is not correct');
      const hashedPassword = await Hashing.hash(newPassword);
      data.password = hashedPassword;
    }
    const updatedUser = await this.prisma.client.user.update({
      where: { id: user.id },
      data: { ...data },
    });
    return updatedUser;
  }
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
