import { FirebaseFunctionsBackground } from '@dhruv-techapps/shared-firebase-functions';
import { IOpenAIQnARate, IOpenAIQnAResponse, IOpenAIRequest } from './openai.types';

export class OpenAIBackground extends FirebaseFunctionsBackground {
  async generateText({ content }: IOpenAIRequest): Promise<string> {
    if (!content || content.trim().length === 0) {
      throw new Error('No prompt provided');
    }
    const data: IOpenAIRequest = { content };
    const result = await this.openAiChat<IOpenAIRequest, IOpenAIRequest>(data);
    return result.content;
  }

  //two functions for openAiQnA and openAiQnARate same as above
  async askQuestion({ content }: IOpenAIRequest): Promise<IOpenAIQnAResponse> {
    if (!content || content.trim().length === 0) {
      throw new Error('No prompt provided');
    }
    const data: IOpenAIRequest = { content };
    const result = await this.openAiQnA<IOpenAIRequest, IOpenAIQnAResponse>(data);
    return result;
  }

  async rateAnswer(data: IOpenAIQnARate): Promise<string> {
    const result = await this.openAiQnARate<IOpenAIQnARate, IOpenAIQnAResponse>(data);
    return result.message;
  }
}
