import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user';
import * as argon from 'argon2';
import { JwtPayload } from './types/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from '~/src/entities';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.findOne(identifier);

    if (!user) return new BadRequestException('Email or password is incorrect');

    const valid = await argon.verify(user.hashedPassword, password);

    if (!valid)
      return new BadRequestException('Email or password is incorrect');

    return null;
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ data: Partial<User>; token: string; expiresIn: string }> {
    const user = await this.usersService.create({
      ...registerDto,
      hashedPassword: registerDto.password,
    });

    delete user.hashedPassword;

    return {
      data: user,
      token: await this.generateJwtToken({ id: user.id }),
      expiresIn: this.config.getOrThrow('JWT_EXPIRY'),
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ data: Partial<User>; token: string; expiresIn: string }> {
    const user = await this.usersService.findOne(loginDto.identifier);

    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const valid = await argon.verify(user.hashedPassword, loginDto.password);

    if (!valid) {
      throw new BadRequestException('Email or password is incorrect');
    }

    delete user.hashedPassword;

    return {
      data: user,
      token: await this.generateJwtToken({ id: user.id }),
      expiresIn: this.config.getOrThrow('JWT_EXPIRY'),
    };
  }

  private async generateJwtToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
