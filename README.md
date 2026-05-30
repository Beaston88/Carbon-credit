# Carbon Credit Marketplace

A marketplace for the trading of carbon credits aimed at encouraging environmentally responsible behavior among companies, regulators, and individuals.

## Project Overview

**Carbon Credit** is a platform built to facilitate the buying, selling, and tracking of carbon credits. The application empowers a transparent and secure marketplace environment, where organizations and stakeholders can engage in carbon offsetting transactions monitored by governing authorities.

## Tech Stack

- **Frontend:** JavaScript, React, React Router
- **Backend:** Node.js, Express.js (Typescript)
- **Blockchain:** Solidity (for smart contracts)
- **APIs:** RESTful
- **Deployment:** 
  - Frontend: [Vercel](https://carbon-credit-hazel.vercel.app/)
  - Backend: [Render](https://carbon-credit-qi44.onrender.com/)

## Features

- Registration and authentication for buyers, sellers, and government authorities.
- Listing and management of carbon credit projects and transactions.
- Governmental approval workflow for credit projects.
- Real-time marketplace for credit trading.
- Blockchain-based verification using smart contracts.
- Detailed transaction and credits history tracking.

## Test Credentials

### BUYER
- Email: `buyer@email.com`
- Password: `123456`

### SELLER
- Email: `seller@email.com`
- Password: `123456`

### GOVT
- Email: `govt@email.com`
- Password: `123456`

## Getting Started

> Please run the backend first. Once your API is working, then start the frontend to fully access project features.

### 1. Backend

- Clone the repository:
  ```sh
  git clone https://github.com/Beaston88/Carbon-credit.git
  cd Carbon-credit
  ```
- Install dependencies and run the backend:
  ```sh
  cd backend
  npm install
  npm run start
  ```
  - When running locally, the backend is available by default at [`http://localhost:3200`](http://localhost:3200)
  - If you want to use the deployed backend instead, use [`https://carbon-credit-qi44.onrender.com/`](https://carbon-credit-qi44.onrender.com/)

### 2. Frontend

- Before starting the frontend, update the frontend `apiURL` to match the backend you want to use:
  - Local backend: `http://localhost:3200`
  - Deployed backend: `https://carbon-credit-qi44.onrender.com/`
- In a new terminal window/tab:
  ```sh
  cd frontend
  npm install
  npm run start
  ```
  - Or use the deployed version: [`https://carbon-credit-hazel.vercel.app/`](https://carbon-credit-hazel.vercel.app/)

## Live Demo

- **Frontend:** [https://carbon-credit-hazel.vercel.app/](https://carbon-credit-hazel.vercel.app/)
- **Backend/API:** [https://carbon-credit-qi44.onrender.com/](https://carbon-credit-qi44.onrender.com/)

## License

This project is under the MIT License.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature/my-feature`).
6. Open a Pull Request.
