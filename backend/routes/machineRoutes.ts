import { Router } from 'express';
import { listMachines } from '../controllers/machineController';
import { apiKeyAuth } from '../middleware/apiKeyAuth';

const router = Router();

router.get('/', apiKeyAuth, listMachines);

export default router; 