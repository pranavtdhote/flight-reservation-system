# Flight Reservation System

## Overview
The Flight Reservation System is a web application that allows users to search for flights, make reservations, and view interactive dashboards for analysis. The application is built using TypeScript, Express, and MongoDB, providing a robust and scalable solution for flight management.

## Features
- **Flight Management**: Users can view available flights, add new flights, and update existing flight information.
- **Reservation System**: Users can create, view, and cancel reservations for flights.
- **Interactive Dashboards**: The application provides dashboards for analyzing reservation data and generating statistics.
- **User Management**: Users can register and manage their profiles.

## Technologies Used
- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Chart.js (for dashboards)

## Project Structure
```
flight-reservation-system
├── src
│   ├── app.ts
│   ├── config
│   │   └── db.ts
│   ├── controllers
│   │   ├── flightController.ts
│   │   ├── reservationController.ts
│   │   └── dashboardController.ts
│   ├── models
│   │   ├── flight.ts
│   │   ├── reservation.ts
│   │   └── user.ts
│   ├── routes
│   │   ├── flightRoutes.ts
│   │   ├── reservationRoutes.ts
│   │   └── dashboardRoutes.ts
│   ├── services
│   │   ├── flightService.ts
│   │   ├── reservationService.ts
│   │   └── dashboardService.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── analysis.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd flight-reservation-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up MongoDB**
   - Ensure you have MongoDB installed and running.
   - Update the database connection settings in `src/config/db.ts`.

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Flight Endpoints**: Access flight-related operations through `/api/flights`.
- **Reservation Endpoints**: Manage reservations via `/api/reservations`.
- **Dashboard Endpoints**: View dashboard data at `/api/dashboard`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.