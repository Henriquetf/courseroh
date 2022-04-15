import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { KafkaService } from './kafka.service';

@Module({
  imports: [CoreModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
