import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const MarketData = ({ symbol }) => {
    const [marketData, setMarketData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/marketData?symbol=${symbol}`);
                const rawData = await response.text(); // Get the raw text response
                console.log('Raw response data:', rawData); // Log the raw data
                const data = JSON.parse(rawData); // Parse the JSON
                setMarketData(data);
            } catch (err) {
                console.error('Error fetching market data:', err);
                setError(err.message);
            }
        };

        fetchMarketData();
    }, [symbol]);

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    if (!marketData) {
        return <Typography>Loading market data...</Typography>;
    }

    return (
        <div>
            <Typography variant="h6">Market Data for {symbol}</Typography>
            <Typography variant="body1">Price: {marketData.lastPrice}</Typography>
            <Typography variant="body1">Volume: {marketData.volume}</Typography>
            <Typography variant="body1">Price Change: {marketData.priceChange}</Typography>
            <Typography variant="body1">Price Change Percent: {marketData.priceChangePercent}%</Typography>
            {/* Display other market data as needed */}
        </div>
    );
};

export default MarketData;
