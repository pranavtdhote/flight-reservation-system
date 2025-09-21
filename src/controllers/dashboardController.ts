import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';

const dashboardService = new DashboardService();

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const data = await dashboardService.getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
};
