import axios from 'axios';
import { factories } from '@strapi/strapi';

const BASE_URL = process.env.CHUTES_BASE_URL || 'https://openrouter.ai/api/v1';
const API_KEY  = process.env.CHUTES_API_KEY || '';

// Debug: verifica que la variable se cargó
console.log('CHUTES_API_KEY loaded?', !!API_KEY);

interface PromptEntity {
  user?: string;
  system?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  [key: string]: any;
}

export default factories.createCoreService('api::prompt.prompt', () => ({
  async chat(entity: PromptEntity) {
    const {
      model       = 'deepseek/deepseek-chat-v3-0324:free',
      system      = '',
      user: userContent = '',
      temperature = 1,
      max_tokens  = 1024,
    } = entity;

    if (!userContent) throw new Error('Prompt is empty');

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

    // Debug: log headers to verify Authorization is included
    console.log('Headers sent to Chutes:', headers);

    let data;
    try {
      const payload = {
        model,
        messages: [
          ...(system ? [{ role: 'system', content: system }] : []),
          { role: 'user', content: userContent },
        ],
        temperature,
        max_tokens,
      };

      // Debug: log payload to compare with working curl request
      console.log('Body to Chutes:', JSON.stringify(payload));

      ({ data } = await axios.post(
        `${BASE_URL}/chat/completions`,
        payload,
        { headers },
      ));

    return data?.choices?.[0]?.message?.content ?? '';
    } catch (err: any) {
      console.error('Raw error from Chutes:', err.response?.data || err);
      throw err;
    }
  },
}));
