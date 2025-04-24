import axios from 'axios';

const COUNTRY_API_BASE = process.env.COUNTRY_API_BASE || 'https://date.nager.at/api/v3';

export const getHolidays = async (countryCode: string, year: number) => {
    try {
        const response = await axios.get(`${COUNTRY_API_BASE}/PublicHolidays/${year}/${countryCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching holidays:', error);
    }
};
