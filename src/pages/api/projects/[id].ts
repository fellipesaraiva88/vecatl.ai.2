// /pages/api/projects/[id].ts

import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    if (req.method === 'PUT') {
      const { name, description, color, context } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Project name is required' });
      }

     const project = await prisma.project.update({
        where: { id },
        data: {
          name,
          description,
          color,
        },
      });
      return res.status(200).json(project);
    }

    if (req.method === "PUT") {
      const { id, name, description, color } = req.body;
      if (!id || !name) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const updated = await prisma.project.update({
        where: { id },
        data: {
          name,
          description,
          color,
        },
      });
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
