import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';

const router = Router();

// Route to get dashboard data
router.get('/', getDashboardData);

export default router;
