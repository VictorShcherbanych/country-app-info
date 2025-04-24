import axios from 'axios';
import countries from 'i18n-iso-countries';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const COUNTRY_API_BASE = process.env.COUNTRY_API_BASE ||'https://date.nager.at/api/v3';
const POPULATION_API_BASE = process.env.POPULATION_API_BASE || 'https://countriesnow.space/api/v0.1/countries/population'
const FLAG_API_BASE = process.env.FLAG_API_BASE || 'https://countriesnow.space/api/v0.1/countries/flag/images';

export const getAvailableCountries = async () => {
    try {
        const response = await axios.get(`${COUNTRY_API_BASE}/AvailableCountries`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching available countries:', error);

    }
};

export const getCountryInfo = async (countryCode: string) => {
    try {
        if (!countryCode) {
            throw new Error('Country code is required');
        }
        
        const countryCodeISO3 = countries.alpha2ToAlpha3(countryCode);
        const borders = await axios.get(`${COUNTRY_API_BASE}/CountryInfo/${countryCode}`);
        const population = await axios.post(POPULATION_API_BASE, {
            iso3: countryCodeISO3
        });
        const flag = await axios.post(FLAG_API_BASE, {
            iso2: countryCode
        });


        return {
            borders: borders.data.borders,
            population: population.data.data,
            flag: flag.data.data.flag,
        };
    } catch (error) {
        console.error('Error fetching country info:', error);

    }
};
