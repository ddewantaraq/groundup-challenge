import { Router } from 'express';
import { listAlerts, alertDetail, updateAlertHandler } from '../controllers/alertController';
import { apiKeyAuth } from '../middleware/apiKeyAuth';

const router = Router();

router.get('/', apiKeyAuth, listAlerts);
router.get('/:id', apiKeyAuth, alertDetail);
router.put('/:id', apiKeyAuth, updateAlertHandler);

export default router; 