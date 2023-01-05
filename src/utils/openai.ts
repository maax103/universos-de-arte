import { Configuration, OpenAIApi, CreateCompletionRequest, CreateImageRequest } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const OpenAI = new OpenAIApi(configuration);

export const handleCompletionResponse = async (question: string) => {
  const completionConfig: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: question,
    max_tokens: 400,
    temperature: 1,
    n: 3,
    frequency_penalty: 0.5,
  };

  const response = await OpenAI.createCompletion(completionConfig);
  return response;
};

export const handleCreateImage = async (context: string) => {
  const createImageConfig: CreateImageRequest = {
    prompt: context,
    n: 4,
    size: '1024x1024',
  };
  const response = await OpenAI.createImage(createImageConfig);
  return response;
};
