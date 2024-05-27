const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const binanceService = require('./services/binanceService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

let priceAlerts = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('fetchOrderBook', async (symbol) => {
        console.log(`Received request for order book: ${symbol}`);
        try {
            const orderBook = await binanceService.getOrderBook(symbol);
            if (orderBook && orderBook.bids && orderBook.asks) {
                socket.emit('orderBook', orderBook);
            } else {
                socket.emit('orderBook', { error: 'Order book not found' });
            }
        } catch (error) {
            socket.emit('orderBook', { error: 'Error fetching order book' });
        }
    });

    socket.on('setPriceAlert', (alert) => {
        priceAlerts.push(alert);
        console.log(`Price alert set for ${alert.symbol} at ${alert.price} (${alert.comparison})`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/marketData', async (req, res) => {
    const symbol = req.query.symbol;

    if (!symbol) {
        return res.status(400).json({ error: 'Symbol parameter is required' });
    }

    try {
        const marketData = await binanceService.getMarketData(symbol);
        res.json(marketData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const checkPriceAlerts = async () => {
    for (const alert of priceAlerts) {
        try {
            const marketData = await binanceService.getMarketData(alert.symbol);
            let currentPrice;
            if (alert.priceType === 'bid') {
                currentPrice = parseFloat(marketData.bidPrice);
            } else if (alert.priceType === 'ask') {
                currentPrice = parseFloat(marketData.askPrice);
            } else {
                currentPrice = parseFloat(marketData.lastPrice);
            }

            const isTriggered = (alert.comparison === 'above' && currentPrice >= alert.price) || 
                                (alert.comparison === 'below' && currentPrice <= alert.price);

            if (isTriggered) {
                io.emit('priceAlert', alert);
                priceAlerts = priceAlerts.filter(a => a !== alert);
                console.log(`Price alert triggered for ${alert.symbol} at ${alert.price} (${alert.comparison})`);
            }
        } catch (error) {
            console.error(`Error checking price alert for ${alert.symbol}:`, error.message);
        }
    }
};

setInterval(checkPriceAlerts, 60000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
