import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DotEnvProvider {
  constructor(private configService: ConfigService) {}

  PORT = () => this.getEnv('PORT');
  AUTH0_AUDIENCE = () => this.getEnv('AUTH0_AUDIENCE');
  AUTH0_DOMAIN = () => this.getEnv('AUTH0_DOMAIN');
  KAFKA_BROKERS = () => this.getEnv('KAFKA_BROKERS');

  getEnv(env: string, defaultValue = ''): string {
    return this.configService.get(env) ?? defaultValue;
  }
}
