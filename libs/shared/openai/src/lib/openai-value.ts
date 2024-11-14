import { OpenAIRequest } from './openai.types';

export class OpenAIValue {
  static isValidPrompt(prompt: string) {
    return prompt && prompt.length > 0;
  }

  static createRequest(prompt: string): OpenAIRequest {
    if (!this.isValidPrompt(prompt)) {
      throw new Error('Invalid prompt');
    }
    return { prompt };
  }
}
