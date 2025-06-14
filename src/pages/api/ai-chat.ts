// /pages/api/ai-chat.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const SYSTEM_PROMPT = `
You are an intelligent agent assistant.
You can manage tasks, projects, notes, and ideas from user prompts.
Supported commands:
- Mark task "Task title" as done
- List all pending tasks
- Create a new project "Project title"
- Edit note titled "Note title"
- Return a summary of all tasks
`;

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'gpt-3.5-turbo'; // Use your confirmed model here

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'system', 'assistant']),
      content: z.string(),
    })
  ),
  mode: z.enum(['Agent', 'Assistant']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  if (!API_KEY) {
    return res.status(500).json({ error: '❌ Missing OpenRouter API key in environment variables' });
  }

  try {
    const parsed = requestSchema.parse(req.body);
    const { messages, mode } = parsed;

    const promptMessages = [
      {
        role: 'system',
        content: mode === 'Agent' ? SYSTEM_PROMPT : 'You are a helpful assistant.',
      },
      ...messages,
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: promptMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Error] Status: ${response.status} ${response.statusText} - ${errorText}`);
      return res.status(response.status).json({ error: `❌ Failed to fetch response from OpenRouter API: ${response.statusText}`, details: errorText });
    }

    const data = await response.json();

    const result = data?.choices?.[0]?.message?.content?.trim();

    if (!result) {
      throw new Error('❌ No valid response from model');
    }

    return res.status(200).json({ result });

  } catch (error: any) {
    const message = error instanceof z.ZodError ? '❌ Invalid request format' : error.message || 'Internal server error';
    console.error('[Agent API Error]', error);
    return res.status(500).json({ error: message });
  }
}
