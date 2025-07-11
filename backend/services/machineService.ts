import { Machine } from '../models/Machine';
import { encodeId } from './Utils';

export async function getMachines(page = 1, pageSize = 10) {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Machine.findAndCountAll({ offset, limit: pageSize });
    return {
      total: count,
      page,
      pageSize,
      machines: rows.map(machine => ({
        id: encodeId(machine.id, 'machine'),
        name: machine.name,
      })),
    };
  } catch (err) {
    throw new Error(`Failed to get machines: ${(err as Error).message}`);
  }
} 