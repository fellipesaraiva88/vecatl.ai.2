import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } });
    res.json(projects);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const project = await prisma.project.create({ data: { name } });
    res.json(project);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.project.delete({ where: { id } });
    res.json({ ok: true });
  } else {
    res.status(405).end();
  }
}
