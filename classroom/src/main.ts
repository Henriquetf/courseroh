import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { DotEnvProvider } from './core/dotenvProvider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const dotEnvProvider = new DotEnvProvider(configService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [dotEnvProvider.KAFKA_BROKERS()],
      },
    },
  });

  await app.listen(dotEnvProvider.PORT());

  await app.startAllMicroservices();
}
bootstrap();
