import express from 'express';
import { getHolidays } from '../services/countryHolidayService';
import Holiday from '../models/holidayModel';


export async function addHolidaysToCalendar(req: express.Request, res: express.Response) {
    const { userId } = req.params;
    const { countryCode, year, holidays } = req.body;

    try {
        const holidayList = await getHolidays(countryCode, year);

        const selectedHolidays = holidayList
            .filter((holiday: any) =>
                holidays ? holidays.includes(holiday.name) : true
            )
            .map((holiday: any) => ({
                date: holiday.date,
                name: holiday.name,
                countryCode: holiday.countryCode,
                global: holiday.global
            }));

        const savedHolidays = await Promise.all(
            selectedHolidays.map(async (holiday: any) => {
                const newHoliday = new Holiday({
                    userId,
                    ...holiday
                });
                return await newHoliday.save();
            })
        );

        res.status(200).json({
            message: 'Holidays have been added to the calendar',
            holidays: savedHolidays,
        });
    } catch (error) {
        console.error('Error while adding holidays:', error);
        res.status(500).json({ message: 'Failed to add holidays to the calendar' });
    }

}

