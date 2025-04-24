import { Request, Response } from 'express';
import { getAvailableCountries, getCountryInfo } from '../services/countryService';

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await getAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries' });
  }
};

export const getCountryDetails = async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  try {
    console.log('Fetching country details for:', countryCode);
    const countryInfo = await getCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country details' });
  }
};
