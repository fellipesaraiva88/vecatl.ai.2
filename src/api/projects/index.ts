import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const projects = await prisma.project.findMany({
          select: {
            id: true,
            name: true,
            color: true,
            isTeam: true,
            context: true,
            tasks: {
              select: {
                id: true,
                title: true,
                completed: true,
              },
            },
          },
        });
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
      }
      break;
    case 'POST':
      try {
        const { name, isTeam, context } = req.body;
        const newProject = await prisma.project.create({
          data: { name, isTeam, context },
        });
        res.status(201).json(newProject);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
