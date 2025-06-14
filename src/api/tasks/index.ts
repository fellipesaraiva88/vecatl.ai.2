import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await prisma.task.findMany({ include: { checklist: true } });
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      break;
    case 'POST':
      try {
        const { title, description, completed, dueDate, importance, recurring, projectId } = req.body;
        const newTask = await prisma.task.create({
          data: { title, description, completed, dueDate, importance, recurring, projectId },
        });
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
