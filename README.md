# Binance Order Book

## Overview

This project is a cryptocurrency dashboard that provides real-time market data, order book depth charts, and price alerts using the Binance Public API.

## Libraries and Technologies Used

- **Frontend**:
  - React: A JavaScript library for building user interfaces.
  - react-chartjs-2: A React wrapper for Chart.js for creating charts.
  - Socket.io-client: A client-side library for real-time WebSocket connections.
  
- **Backend**:
  - Node.js: JavaScript runtime for the server-side.
  - Express: Web framework for Node.js.
  - Socket.io: Library for real-time WebSocket connections.
  - Axios: Promise-based HTTP client for making API requests.
  
- **Binance API**:
  - Used for fetching real-time market data and order book data.

## How to Run the Application

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn

### Setup

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/minhquang-tran/binance-order-book.git
   cd binance-order-book
   ```

2. **Install Backend Dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```

4. **Run the Backend Server** (In the `backend` folder):

   ```sh
   node server.js
   ```

5. **Run the Frontend Application** (In the `frontend` folder):

   ```sh
   npm start
   ```

6. **Access the Application**:

   Open your browser and navigate to `http://localhost:3000`.

## Code Structure

```plaintext
binance-order-book/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── services/
│       └── binanceService.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── DepthChart.js
│   │   │   ├── MarketData.js
│   │   │   ├── OrderBook.js
│   │   │   ├── PriceAlert.js
│   │   │   └── SearchBar.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

### Backend

- **server.js**: Main server file that sets up the Express server and Socket.io for real-time communication.
- **services/binanceService.js**: Handles API requests to the Binance Public API.

### Frontend

- **App.js**: Main React component that renders the dashboard.
- **components/**: Contains individual React components for different parts of the dashboard:
  - **DepthChart.js**: Displays the order book depth chart.
  - **MarketData.js**: Shows real-time market data.
  - **OrderBook.js**: Displays the order book for selected cryptocurrency.
  - **PriceAlert.js**: Allows users to set price alerts.
  - **SearchBar.js**: Provides a search bar to input the cryptocurrency symbol.

## Responsible Data Usage

### Rate Limits

- **Binance API Rate Limits**: The Binance Public API has rate limits to prevent abuse. The application does not currently implement server-side caching or throttling. Users should be aware of the rate limits and manage their requests accordingly.

### Data Fetching Strategy

- **Server-Side Fetching**: Market data and order book data are fetched on the server side and sent to the client via WebSocket.
- **Client-Side Management**: The client subscribes to real-time updates via WebSocket, ensuring minimal API usage and timely updates.
