import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string }) {
    const user = { username: body.username, sub: 1 };
    return this.authService.generateToken(user);
  }
}