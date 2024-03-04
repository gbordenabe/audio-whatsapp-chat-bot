// src/services/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class WhatsAppService {
  private client: Client;

  constructor(private readonly openaiService: OpenaiService) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.client.on('qr', (qr) => {
      console.log(qr);
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('message_create', async (message) => {
      console.log(message);
      console.log('Message received!');
      if (message.hasMedia && message.isForwarded && message.fromMe) {
        console.log('Media is forwarded!');
        const media = await message.downloadMedia();
        if (media && media.mimetype === 'audio/ogg; codecs=opus') {
          console.log('Media is audio!');
          this.openaiService.sendAudioToTranscribe(media.data);
        }
      } else {
        console.log(
          'Message is not media or not forwarded and its not from me!',
        );
      }
    });

    this.client.initialize();
  }

  async sendAudioToTranscribe(audio) {
    this.openaiService.sendAudioToTranscribe(audio);
  }
}
