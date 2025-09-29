import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { Hashing } from 'src/common/utils/hashing.util';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserRole } from 'src/generated/enums';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.prismaService.prisma.user.findFirst({
      where: {
        OR: [{ email: loginDto.email }, { username: loginDto.username }],
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    if (!user) throw new BadRequestException('username or email is incorrect');
    await Hashing.compareOrFail(loginDto.password, user.password);
    const payload = {
      id: user.id,
      username: user.username,
    };
    await this.prismaService.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: dayjs().toDate() },
    });
    return {
      id: user.id,
      token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    };
  }
  async signup(signupDto: SignupDto) {
    const user = await this.prismaService.prisma.user.findFirst({
      where: {
        OR: [{ email: signupDto.email }, { username: signupDto.username }],
      },
      select: { id: true },
    });
    if (user) throw new ConflictException('User already exists');
    const hashedPassword = await Hashing.hash(signupDto.password);
    const newUser = await this.prismaService.prisma.user.create({
      data: {
        ...signupDto,
        password: hashedPassword,
        role: UserRole.SELLER,
        lastLogin: dayjs().toDate(),
      },
      select: { id: true, username: true },
    });

    const userPayload = {
      id: newUser.id,
      username: newUser.username,
    };
    return {
      id: newUser.id,
      token: this.jwtService.sign(userPayload, { expiresIn: '7d' }),
    };
  }
}
