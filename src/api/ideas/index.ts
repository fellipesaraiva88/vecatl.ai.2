import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const ideas = await prisma.idea.findMany();
        res.status(200).json(ideas);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ideas' });
      }
      break;
    case 'POST':
      try {
        const { content } = req.body;
        const newIdea = await prisma.idea.create({ data: { content } });
        res.status(201).json(newIdea);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create idea' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
