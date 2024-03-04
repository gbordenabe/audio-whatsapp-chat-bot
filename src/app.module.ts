import { Module } from '@nestjs/common';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [WhatsAppModule, OpenaiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
