import { Router } from 'express';
import { listAlerts, alertDetail, updateAlertHandler } from '../controllers/alertController';

const router = Router();

router.get('/', listAlerts);
router.get('/:id', alertDetail);
router.put('/:id', updateAlertHandler);

export default router; 