import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import countryRoutes from './routes/countryRoutes';
import holidayRoutes from './routes/countryHolidayRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api/countries', countryRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', holidayRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Unhandled rejection: ${err.message}`);
  process.exit(1);
});
