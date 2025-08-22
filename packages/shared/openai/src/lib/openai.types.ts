export interface IOpenAIRequest {
  content: string;
}

export interface IOpenAIResponse {
  content: string;
}

export interface IOpenAIQnARate {
  chatId: string;
  rating: number;
  feedback: string;
}

export interface IOpenAIQnAResponse {
  answer: string;
  sources: string[];
}

export interface IOpenAIQnAResponse {
  success: boolean;
  message: string;
}
