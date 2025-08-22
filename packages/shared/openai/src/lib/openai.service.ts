import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_OPENAI } from './openai.constant';
import { IOpenAIQnARate, IOpenAIRequest } from './openai.types';

export class OpenAIService extends CoreService {
  static async generateText(message: IOpenAIRequest): Promise<string> {
    return await this.message<RuntimeMessageRequest<IOpenAIRequest>, string>({
      messenger: RUNTIME_MESSAGE_OPENAI,
      methodName: 'generateText',
      message
    });
  }
  // function for askQuestion and rateAnswer
  static async askQuestion(message: IOpenAIRequest): Promise<string> {
    return await this.message<RuntimeMessageRequest<IOpenAIRequest>, string>({
      messenger: RUNTIME_MESSAGE_OPENAI,
      methodName: 'askQuestion',
      message
    });
  }

  static async rateAnswer(message: IOpenAIQnARate): Promise<string> {
    return await this.message<RuntimeMessageRequest<IOpenAIQnARate>, string>({
      messenger: RUNTIME_MESSAGE_OPENAI,
      methodName: 'rateAnswer',
      message
    });
  }
}
