export const GPT_API_URL = "https://api.openai.com/v1/chat/completions";

export interface GptApiRequest {
  model: string;
  messages: GptMessage[];
  temperature: number;
}

export interface GptMessage {
  role: string;
  content: string;
}

export interface GptApiResponse {
  choices: GptChoice[];
}

export interface GptChoice {
  message: GptMessage;
}

export enum Provider {
  OPENAI = "openai",
  GEMINI = "gemini",
  OPENROUTER = "openrouter"
}

export enum GptModel {
  GPT_5_2 = "gpt-5.2",
  GPT_5_1 = "gpt-5.1",
  GPT_5 = "gpt-5",
  GPT_5_MINI = "gpt-5-mini",
  GPT_5_NANO = "gpt-5-nano",
  GPT_4O = "gpt-4o",
  GPT_4O_MINI = "gpt-4o-mini",
  GPT_4_1 = "gpt-4.1",
  GPT_4_1_MINI = "gpt-4.1-mini",
  O3 = "o3",
  O3_MINI = "o3-mini",
  O1 = "o1"
}

export enum GeminiModel {
  GEMINI_2_5_PRO = "gemini-2.5-pro",
  GEMINI_2_5_FLASH = "gemini-2.5-flash",
  GEMINI_2_5_FLASH_LITE = "gemini-2.5-flash-lite",
  GEMINI_2_0_FLASH = "gemini-2.0-flash",
  GEMINI_2_0_FLASH_LITE = "gemini-2.0-flash-lite",
  GEMINI_1_5_PRO = "gemini-1.5-pro",
  GEMINI_1_5_FLASH = "gemini-1.5-flash"
}

export enum OpenRouterModel {
  GPT_5 = "openai/gpt-5",
  GPT_5_MINI = "openai/gpt-5-mini",
  GPT_4O = "openai/gpt-4o",
  GPT_4O_MINI = "openai/gpt-4o-mini",
  CLAUDE_OPUS_4_1 = "anthropic/claude-opus-4.1",
  CLAUDE_SONNET_4_5 = "anthropic/claude-sonnet-4.5",
  CLAUDE_3_5_SONNET = "anthropic/claude-3.5-sonnet",
  GEMINI_2_5_PRO = "google/gemini-2.5-pro",
  GEMINI_2_5_FLASH = "google/gemini-2.5-flash",
  GEMINI_2_0_FLASH = "google/gemini-2.0-flash-001",
  DEEPSEEK_V3 = "deepseek/deepseek-chat-v3.1",
  DEEPSEEK_R1 = "deepseek/deepseek-r1",
  GROK_4 = "x-ai/grok-4",
  LLAMA_4_MAVERICK = "meta-llama/llama-4-maverick",
  QWEN_3_MAX = "qwen/qwen3-max",
  MISTRAL_LARGE = "mistralai/mistral-large"
}

export const PROVIDER_MODELS: Record<Provider, string[]> = {
  [Provider.OPENAI]: Object.values(GptModel),
  [Provider.GEMINI]: Object.values(GeminiModel),
  [Provider.OPENROUTER]: Object.values(OpenRouterModel)
};

export const PROVIDER_DEFAULT_MODEL: Record<Provider, string> = {
  [Provider.OPENAI]: GptModel.GPT_5_2,
  [Provider.GEMINI]: GeminiModel.GEMINI_2_5_FLASH,
  [Provider.OPENROUTER]: OpenRouterModel.GPT_4O_MINI
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  [Provider.OPENAI]: "OpenAI",
  [Provider.GEMINI]: "Google Gemini",
  [Provider.OPENROUTER]: "OpenRouter"
};
