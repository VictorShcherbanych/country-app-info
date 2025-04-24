# Country Info Application

A RESTful API built with Express and TypeScript that provides information about countries, their holidays, and allows users to add holiday information to their personal calendars.

## Features

- User authentication (register, login) with JWT
- Get list of available countries
- Get detailed information about a specific country (borders, population, flag)
- Fetch public holidays for any country
- Add selected holidays to user's personal calendar DB

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **External APIs**: Date.nager.at API for country and holiday data

## Prerequisites

- Node.js (v18+)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://your-repository-url/country-app-info.git
cd country-app-info
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/country-info-app
JWT_SECRET=your_jwt_secret_key_here
COUNTRY_API_BASE=https://date.nager.at/api/v3
POPULATION_API_BASE=https://countriesnow.space/api/v0.1/countries/population
FLAG_API_BASE=https://countriesnow.space/api/v0.1/countries/flag/images
```

## Running the Application

Development mode:
```bash
npx ts-node app.ts
```

Build for production:
```bash
npx tsc
```

Start production server (after building):
```bash
node src/app.js
```

## API Endpoints

### Authentication

- **POST /api/users/register** - Register a new user
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: User object with JWT token

- **POST /api/users/login** - Login user
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: User object with JWT token

### Countries

- **GET /api/countries** - Get list of available countries
  - Response: Array of country objects

- **GET /api/countries/:countryCode** - Get detailed information about a specific country
  - Response: Country details including borders, population, and flag

### Holidays

- **POST /api/users/:userId/calendar/holidays** - Add holidays to user's calendar (requires authentication)
  - Request body: `{ "countryCode": "string", "year": number, "holidays": ["string"] }`
  - Response: Added holidays

## Authorization

Protected routes require a valid JWT token sent in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Handling

The API returns appropriate status codes and error messages for different scenarios:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 500: Server error

## License

ISC

## Author

VS
