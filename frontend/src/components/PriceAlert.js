import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const PriceAlert = ({ symbol }) => {
    const [price, setPrice] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [comparison, setComparison] = useState('above');
    const [priceType, setPriceType] = useState('last');

    useEffect(() => {
        const socket = io('http://localhost:4000');

        socket.on('priceAlert', (alert) => {
            console.log('Price alert received:', alert);
            window.alert(`Price alert! ${alert.symbol} has ${alert.comparison === 'above' ? 'exceeded' : 'dropped below'} ${alert.price} based on ${alert.priceType} price`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const addAlert = () => {
        const alert = { symbol, price: parseFloat(price), comparison, priceType };
        setAlerts([...alerts, alert]);

        const socket = io('http://localhost:4000');
        socket.emit('setPriceAlert', alert);
        setPrice('');
    };

    return (
        <div>
            <h2>Price Alert for {symbol}</h2>
            <input 
                type="number" 
                placeholder="Target Price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
            />
            <select value={comparison} onChange={(e) => setComparison(e.target.value)}>
                <option value="above">Above</option>
                <option value="below">Below</option>
            </select>
            <select value={priceType} onChange={(e) => setPriceType(e.target.value)}>
                <option value="last">Last Price</option>
                <option value="bid">Bid Price</option>
                <option value="ask">Ask Price</option>
            </select>
            <button onClick={addAlert}>Add Alert</button>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>
                        {alert.symbol}: {alert.comparison} {alert.price} ({alert.priceType})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PriceAlert;
