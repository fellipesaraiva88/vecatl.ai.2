import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(projects);
    }

    if (req.method === "POST") {
      const { name, description, color } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Project name is required" });
      }

      const project = await prisma.project.create({
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
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Missing project ID" });

      await prisma.project.delete({
        where: { id },
      });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Project API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
