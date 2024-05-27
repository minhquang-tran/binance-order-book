import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DepthChart from './DepthChart';  // Ensure this path is correct
import PriceAlert from './PriceAlert';  // Ensure this path is correct
import MarketData from './MarketData';  // Ensure this path is correct
import { Typography, Paper, Grid } from '@mui/material';

const socket = io('http://localhost:4000');

const OrderBook = ({ symbol }) => {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (symbol) {
            socket.emit('fetchOrderBook', symbol);
            socket.on('orderBook', (data) => {
                if (data.error) {
                    setError(data.error);
                    setOrderBook({ bids: [], asks: [] });
                } else {
                    setError(null);
                    setOrderBook(data);
                }
            });
        }

        return () => {
            socket.off('orderBook');
        };
    }, [symbol]);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h4">Order Book for {symbol}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5">Bids</Typography>
                    {orderBook.bids.map(([price, quantity], index) => (
                        <Typography key={index}>
                            {price} - {quantity}
                        </Typography>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">Asks</Typography>
                    {orderBook.asks.map(([price, quantity], index) => (
                        <Typography key={index}>
                            {price} - {quantity}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
            <DepthChart bids={orderBook.bids} asks={orderBook.asks} />
            <PriceAlert symbol={symbol} />
            <MarketData symbol={symbol} />
        </Paper>
    );
};

export default OrderBook;
