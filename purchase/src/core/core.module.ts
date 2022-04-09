import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DotEnvProvider } from './dotenvProvider';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DotEnvProvider],
  exports: [DotEnvProvider],
})
export class CoreModule {}
