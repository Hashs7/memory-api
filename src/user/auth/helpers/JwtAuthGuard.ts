import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { SetMetadata, UnauthorizedException } from '@nestjs/common';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();

    const allowAny = this.reflector.get<string[]>(
      'allow-any',
      context.getHandler(),
    );
    if (user) return user;
    if (allowAny) return true;
    throw new UnauthorizedException();
  }
}

export const AllowAny = () => SetMetadata('allow-any', true);
