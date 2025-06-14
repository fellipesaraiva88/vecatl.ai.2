import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from '../../lib/prisma';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  isImportant: z.boolean().optional(),
  createdAt: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
        res.status(200).json(notes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
      }
      break;
    case 'POST':
      try {
        const parsedData = noteSchema.parse({
          ...req.body,
          description: req.body.description || '',
        });
        const newNote = await prisma.note.create({
          data: parsedData,
        });
        res.status(201).json(newNote);
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ error: error.errors });
        } else if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
