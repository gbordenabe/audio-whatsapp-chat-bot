import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [WhatsAppService],
})
export class WhatsAppModule {}
