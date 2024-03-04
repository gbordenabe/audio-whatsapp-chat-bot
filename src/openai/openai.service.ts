import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiService {
  async sendAudioToTranscribe(audio) {
    console.log('enviando a openai');
  }
}
