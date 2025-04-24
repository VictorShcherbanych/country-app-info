import { Router } from 'express';
import { addHolidaysToCalendar } from '../controllers/countryHolidayController';
import { middleware } from '../middlewares/auth';

const router = Router();

router.post('/:userId/calendar/holidays', middleware, addHolidaysToCalendar);

export default router;
