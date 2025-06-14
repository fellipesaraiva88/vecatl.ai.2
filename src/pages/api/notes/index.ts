import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const ideas = await prisma.idea.findMany({ orderBy: { id: 'desc' } });
    res.json(ideas);
  } else if (req.method === 'POST') {
    const { content } = req.body;
    const idea = await prisma.idea.create({ data: { content } });
    res.json(idea);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.idea.delete({ where: { id } });
    res.json({ ok: true });
  } else {
    res.status(405).end();
  }
}
