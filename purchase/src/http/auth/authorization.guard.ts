import { promisify } from 'node:util';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

import { DotEnvProvider } from '../../core/dotenvProvider';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private dotEnvProvider: DotEnvProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const httpContext = context.switchToHttp();

    // const request = httpContext.getRequest<IncomingMessage>();
    // const response = httpContext.getResponse<ServerResponse>();

    const { req, res } = GqlExecutionContext.create(context).getContext();

    try {
      await this.checkJWT()(req as any, res as any);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private checkJWT() {
    const jwtRequestHandler = jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${this.dotEnvProvider.AUTH0_DOMAIN()}.well-known/jwks.json`,
      }),
      audience: this.dotEnvProvider.AUTH0_AUDIENCE(),
      issuer: this.dotEnvProvider.AUTH0_DOMAIN(),
      algorithms: ['RS256'],
    });

    return promisify(jwtRequestHandler);
  }
}
