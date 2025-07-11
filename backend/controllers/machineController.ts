import { Request, Response } from 'express';
import { getMachines } from '../services/machineService';

export async function listMachines(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const result = await getMachines(page, pageSize);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
} 