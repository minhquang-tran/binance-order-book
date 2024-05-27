// backend/services/binanceService.js
const axios = require('axios');

const getOrderBook = async (symbol) => {
    try {
        const response = await axios.get(`https://api.binance.com/api/v3/depth`, {
            params: { symbol, limit: 20 },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching order book:', error);
    }
};

const getMarketData = async (symbol) => {
    try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching market data from Binance:', error.message);
        throw new Error('Failed to fetch market data');
    }
};

module.exports = {
    getOrderBook,
    getMarketData,
};