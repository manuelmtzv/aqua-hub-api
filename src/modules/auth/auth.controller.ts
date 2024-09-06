import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithRefreshToken } from './types/requestWithRefreshToken.type';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { User } from '@/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate')
  @UseGuards(AccessJwtGuard)
  async validate(@GetUser() user: User) {
    return { message: 'Valid token', data: user };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: RequestWithRefreshToken) {
    const { user, tokenId, refreshToken } = req.user;
    return this.authService.updateRefreshToken(user, tokenId, refreshToken);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('logout')
  async logout(@Req() req: RequestWithRefreshToken) {
    const { tokenId } = req.user;
    return this.authService.logout(tokenId);
  }
}
