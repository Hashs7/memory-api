import { Controller, Get } from '@nestjs/common';
import { AllowAny } from './user/auth/helpers/JwtAuthGuard';

@Controller()
export class AppController {
  @AllowAny()
  @Get()
  test() {
    return 'Welcome';
  }
}
