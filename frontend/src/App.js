// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// frontend/src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import OrderBook from './components/OrderBook';

const App = () => {
    const [symbol, setSymbol] = useState('');

    return (
        <div className="App">
            <h1>Real-Time Cryptocurrency Order Book</h1>
            <SearchBar onSearch={setSymbol} />
            {symbol && <OrderBook symbol={symbol} />}
        </div>
    );
};

export default App;

