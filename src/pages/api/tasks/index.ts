// pages/api/tasks/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const tasks = await prisma.task.findMany({
        orderBy: { id: 'desc' },
      });
      res.status(200).json(tasks);
    } 
    
    else if (req.method === 'POST') {
      const { title } = req.body;
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title is required.' });
      }
      const task = await prisma.task.create({
        data: { title, completed: false },
      });
      res.status(201).json(task);
    } 
    
    else if (req.method === 'PUT') {
      const { id, completed } = req.body;
      if (typeof id !== 'number' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid id or completed value.' });
      }
      const task = await prisma.task.update({
        where: { id },
        data: { completed },
      });
      res.status(200).json(task);
    } 
    
    else if (req.method === 'DELETE') {
      const { id } = req.body;
      if (typeof id !== 'number') {
        return res.status(400).json({ error: 'Invalid id.' });
      }
      await prisma.task.delete({
        where: { id },
      });
      res.status(200).json({ ok: true });
    } 
    
    else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
