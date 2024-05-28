# Crypto Dashboard

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

2. **Install Dependencies**:

   ```sh
   npm install
   cd frontend
   npm install
   ```

3. **Run the Backend Server**:

   ```sh
   cd backend
   node server.js
   ```

4. **Run the Frontend Application**:

   ```sh
   cd frontend
   npm start
   ```

5. **Access the Application**:

   Open your browser and navigate to `http://localhost:3000`.

## Responsible Data Usage

### Rate Limits

- **Binance API Rate Limits**: The Binance Public API has rate limits to prevent abuse. The application does not currently implement server-side caching or throttling. Users should be aware of the rate limits and manage their requests accordingly.

### Data Fetching Strategy

- **Server-Side Fetching**: Market data and order book data are fetched on the server side and sent to the client via WebSocket.
- **Client-Side Management**: The client subscribes to real-time updates via WebSocket, ensuring minimal API usage and timely updates.
