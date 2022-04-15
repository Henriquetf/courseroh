import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DotEnvProvider } from 'src/core/dotenvProvider';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(dotEnvProvider: DotEnvProvider) {
    super({
      client: {
        clientId: 'purchases',
        brokers: [dotEnvProvider.KAFKA_BROKERS()],
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.close();
  }
}
