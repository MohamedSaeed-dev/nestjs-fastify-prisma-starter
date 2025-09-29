import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../database/prisma.service';
import { User } from '@/generated/client';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
    });
  }
  async validate(payload: any): Promise<User> {
    const user = await this.prismaService.prisma.user.findUnique({
      cacheStrategy: {
        ttl: 60, // Cache for 1 minute
      },
      where: { id: payload?.id },
      omit: { password: false },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User blocked');
    }
    return user;
  }
}
