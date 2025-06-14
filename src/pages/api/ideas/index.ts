import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Request Headers:', req.headers); // Log client headers
      res.setHeader('Cache-Control', 'no-store'); // Prevent caching
      const ideas = await prisma.idea.findMany({ orderBy: { id: 'desc' } });
      res.status(200).json(ideas); // Explicitly set status to 200
    } else if (req.method === 'POST') {
      console.log('Request Body:', req.body); // Log the request body
      const { content } = req.body;
      if (!content || typeof content !== 'string' || !content.trim()) {
        res.status(400).json({ error: 'Content is required and must be a non-empty string.' });
        return;
      }
      const idea = await prisma.idea.create({ data: { content: content.trim() } }); // Ensure content is trimmed
      res.status(201).json(idea); // Explicitly set status to 201 for creation
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      if (typeof id !== 'number') {
        res.status(400).json({ error: 'ID is required and must be a number.' });
        return;
      }
      await prisma.idea.delete({ where: { id } });
      res.json({ ok: true });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error('API Error:', error); // Log any errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
