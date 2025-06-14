// /pages/api/ai-chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages, mode } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer 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`, // <-- Your key here
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages,
    }),
  });

  const result = await response.json();
  const reply = result.choices?.[0]?.message?.content || "Sorry, no response.";

  res.status(200).json({ result: reply });
}
