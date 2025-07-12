import { Request, Response } from 'express';
import { getAlerts, getAlertDetail, updateAlert } from '../services/alertService';

export async function listAlerts(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const machineId = req.query.machineId as string | undefined;
    const result = await getAlerts(page, pageSize, machineId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function alertDetail(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await getAlertDetail(id);
    if (!result) return res.status(404).json({ error: 'Alert not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function updateAlertHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await updateAlert(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    const errorMessage = (err as Error).message;
    if (errorMessage.includes('At least one field') || errorMessage.includes('updated_by cannot be empty')) {
      res.status(400).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
} 