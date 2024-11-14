import { FirebaseFunctionsBackground } from '@dhruv-techapps/firebase-functions';
import { OpenAIRequest, OpenAIResponse } from './openai.types';

export class OpenAIBackground extends FirebaseFunctionsBackground {
  async generateText({ prompt }: OpenAIRequest): Promise<string> {
    if (!prompt) {
      throw new Error('No prompt provided');
    }
    const data: OpenAIRequest = { prompt };
    const result = await this.openAiChat<OpenAIRequest, OpenAIResponse>(data);
    return result.message;
  }
}
