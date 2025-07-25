import { Alert } from '../models/Alert';
import { encodeId, decodeId } from './Utils';
import { Machine } from '../models/Machine';
import { AlertCommentLog } from '../models/AlertCommentLog';
import type { AlertCommentLogCreationAttributes } from '../models/AlertCommentLog';

export interface UpdateAlertPayload {
  suspected_reason?: string;
  action?: string;
  comment?: string;
  updated_by?: string;
}

export async function getAlerts(page = 1, pageSize = 10, machineId?: string) {
  try {
    const offset = (page - 1) * pageSize;
    let where: any = {};
    if (machineId) {
      const decodedMachineId = decodeId(machineId, 'machine');
      where.machine_id = decodedMachineId;
    }
    const { count, rows } = await Alert.findAndCountAll({
      offset,
      limit: pageSize,
      where,
      include: [{ model: Machine, as: 'machine' }],
      order: [['id', 'ASC']],
    });
    return {
      total: count,
      page,
      pageSize,
      alerts: rows.map(alert => ({
        id: encodeId(alert.id, 'alert'),
        timestamp: new Date(Number(alert.timestamp)),
        machine: alert.machine ? {
          id: encodeId(alert.machine.id, 'machine'),
          name: alert.machine.name,
        } : null,
        suspected_reason: alert.suspected_reason,
        alert_type: alert.alert_type,
        created_at: alert.created_at,
      })),
    };
  } catch (err) {
    throw new Error(`Failed to get alerts: ${(err as Error).message}`);
  }
}

export async function getAlertDetail(obfuscatedId: string) {
  try {
    const id = decodeId(obfuscatedId, 'alert');
    const alert = await Alert.findByPk(id, { include: [{ model: Machine, as: 'machine' }] });
    if (!alert) return null;
    return {
      id: encodeId(alert.id, 'alert'),
      timestamp: new Date(Number(alert.timestamp)),
      machine: alert.machine ? {
        id: encodeId(alert.machine.id, 'machine'),
        name: alert.machine.name,
      } : null,
      alert_type: alert.alert_type,
      sensor: alert.sensor,
      sound_clip: alert.sound_clip,
      suspected_reason: alert.suspected_reason,
      action: alert.action,
      comment: alert.comment,
      created_at: alert.created_at,
      updated_at: alert.updated_at,
    };
  } catch (err) {
    throw new Error(`Failed to get alert detail: ${(err as Error).message}`);
  }
}

export async function updateAlert(obfuscatedId: string, data: UpdateAlertPayload) {
  try {
    // Validate that at least one meaningful field is provided (excluding updated_by if not provided)
    const meaningfulFields = ['suspected_reason', 'action', 'comment'];
    const hasValidFields = meaningfulFields.some(field => {
      const value = data[field as keyof UpdateAlertPayload];
      return value !== undefined && value !== null && value !== '';
    });
    
    if (!hasValidFields) {
      throw new Error('At least one field (suspected_reason, action, or comment) must be provided');
    }

    if ('updated_by' in data && (!data.updated_by || data.updated_by.trim() === '')) {
      throw new Error('updated_by cannot be empty if provided');
    }

    const id = decodeId(obfuscatedId, 'alert');
    const alert = await Alert.findByPk(id);
    if (!alert) throw new Error('Alert not found');
    const payload = {
      ...data,
      updated_by: data.updated_by || 'anonymous'
    }
    await alert.update(payload);
    const logData: AlertCommentLogCreationAttributes = {
      alert_id: alert.id,
      suspected_reason: data.suspected_reason,
      action: data.action,
      comment: data.comment,
      updated_at: new Date(),
      updated_by: data.updated_by || 'anonymous',
    };
    await AlertCommentLog.create(logData);
    return await getAlertDetail(encodeId(alert.id, 'alert'));
  } catch (err) {
    throw new Error(`Failed to update alert: ${(err as Error).message}`);
  }
} 