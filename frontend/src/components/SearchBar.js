// frontend/src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (symbol.trim()) {
            onSearch(symbol.trim().toUpperCase());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter cryptocurrency symbol"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;