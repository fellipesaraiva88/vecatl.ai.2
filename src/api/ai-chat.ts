import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
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
const MODEL = 'gpt-4'; // Updated model

if (!API_KEY) {
  throw new Error('Missing OpenRouter API key in environment variables');
}

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
  mode: z.enum(['Agent', 'Assistant']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const parsedBody = requestSchema.parse(req.body);
    const { messages, mode } = parsedBody;

    const promptMessages = [
      { role: 'system', content: mode === 'Agent' ? SYSTEM_PROMPT : 'You are a helpful assistant.' },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: promptMessages,
      }),
    });

    if (!response.ok) {
      console.error(`[API Error] Status: ${response.status}, Message: ${response.statusText}`);
      throw new Error('Failed to fetch response from OpenRouter API');
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('[API Response Error] Invalid response structure:', data);
      throw new Error('Invalid response structure from OpenRouter API');
    }

    const result = data.choices[0].message.content || '❌ No response received.';

    // Ensure consistent output
    const consistentOutput = result || 'This is a predefined consistent response.';
    res.status(200).json({ result: consistentOutput });

  } catch (err) {
    console.error('[Agent Chat Error]', err);
    res.status(500).json({ error: err instanceof z.ZodError ? 'Invalid request format' : 'Internal Server Error' });
  }
}
