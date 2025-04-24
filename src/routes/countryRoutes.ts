import { Router } from 'express';
import { getCountries, getCountryDetails } from '../controllers/countryController';

const router = Router();

router.get('/', getCountries);
router.get('/:countryCode', getCountryDetails);

export default router;
