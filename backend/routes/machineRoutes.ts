import { Router } from 'express';
import { listMachines } from '../controllers/machineController';

const router = Router();

router.get('/', listMachines);

export default router; 