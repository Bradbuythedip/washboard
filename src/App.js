import React, { useState, useEffect } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import TokenCard from './components/TokenCard';
import PriceChart from './components/PriceChart';
import TradingPanel from './components/TradingPanel';
import Portfolio from './components/Portfolio';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch real tokens from PumpFun API
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const pumpfunApi = await import('./services/pumpfunApi');
        
        // Check API health
        const health = await pumpfunApi.checkApiHealth();
        console.log('API Health:', health);
        
        // Fetch tokens from PumpFun
        const response = await pumpfunApi.fetchPumpFunTokens(50, 0);
        
        if (response && Array.isArray(response)) {
          const formattedTokens = response.map(token => pumpfunApi.formatTokenData(token));
          setTokens(formattedTokens);
          if (formattedTokens.length > 0) {
            setSelectedToken(formattedTokens[0]);
          }
          console.log('Loaded tokens from PumpFun:', formattedTokens.length);
        } else {
          // Fallback to mock data
          loadMockTokens();
        }
      } catch (error) {
        console.error('Error loading PumpFun tokens, using mock data:', error);
        loadMockTokens();
      }
    };
    
    const loadMockTokens = () => {
      const mockTokens = [
        {
          id: 1,
          name: 'PumpCoin',
          symbol: 'PUMP',
          price: 0.00234,
          change24h: 15.7,
          marketCap: 1250000,
          volume24h: 45000
        },
        {
          id: 2,
          name: 'MoonToken',
          symbol: 'MOON',
          price: 0.00567,
          change24h: -8.3,
          marketCap: 890000,
          volume24h: 32000
        },
        {
          id: 3,
          name: 'RocketFuel',
          symbol: 'FUEL',
          price: 0.01234,
          change24h: 45.2,
          marketCap: 2100000,
          volume24h: 78000
        },
        {
          id: 4,
          name: 'DiamondHands',
          symbol: 'DIAM',
          price: 0.00891,
          change24h: 23.4,
          marketCap: 1560000,
          volume24h: 56000
        },
        {
          id: 5,
          name: 'LaserEyes',
          symbol: 'LASER',
          price: 0.00456,
          change24h: -12.1,
          marketCap: 750000,
          volume24h: 28000
        },
        {
          id: 6,
          name: 'SolarPump',
          symbol: 'SOLAR',
          price: 0.00123,
          change24h: 67.8,
          marketCap: 3200000,
          volume24h: 125000
        }
      ];
      setTokens(mockTokens);
      setSelectedToken(mockTokens[0]);
      console.log('Using mock tokens (API unavailable)');
    };
    
    loadTokens();
  }, []);

  // Fetch real chart data when token is selected
  useEffect(() => {
    const loadChartData = async () => {
      if (selectedToken) {
        try {
          const pumpfunApi = await import('./services/pumpfunApi');
          
          // Try to fetch real price history
          if (selectedToken.mint) {
            const priceHistory = await pumpfunApi.fetchTokenPriceHistory(selectedToken.mint, '1h', 24);
            if (priceHistory && priceHistory.length > 0) {
              setChartData(priceHistory);
              return;
            }
          }
        } catch (error) {
          console.error('Error loading chart data:', error);
        }
        
        // Fallback to generated data
        const generateChartData = () => {
          const data = [];
          const now = Date.now();
          const basePrice = selectedToken.price;
          
          for (let i = 24; i >= 0; i--) {
            const time = now - (i * 60 * 60 * 1000);
            const variance = (Math.random() - 0.5) * 0.1;
            const price = basePrice * (1 + variance);
            data.push({ time, price });
          }
          return data;
        };
        setChartData(generateChartData());
      }
    };
    
    loadChartData();
  }, [selectedToken]);

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedToken && chartData.length > 0) {
        setChartData(prevData => {
          const newData = [...prevData.slice(1)];
          const lastPrice = prevData[prevData.length - 1].price;
          const variance = (Math.random() - 0.5) * 0.02;
          const newPrice = lastPrice * (1 + variance);
          newData.push({ time: Date.now(), price: newPrice });
          return newData;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedToken, chartData]);

  const handleWalletConnect = () => {
    // Simulate wallet connection
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(mockAddress);
    setWalletConnected(true);
    
    // Initialize mock portfolio
    const mockPortfolio = [
      {
        name: 'PumpCoin',
        symbol: 'PUMP',
        amount: 1250.5,
        price: 0.00234,
        value: 2.926,
        profit: 0.45
      },
      {
        name: 'RocketFuel',
        symbol: 'FUEL',
        amount: 500.25,
        price: 0.01234,
        value: 6.173,
        profit: -0.32
      }
    ];
    setPortfolio(mockPortfolio);
    
    const total = mockPortfolio.reduce((sum, holding) => sum + holding.value, 0);
    setTotalPortfolioValue(total);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setPortfolio([]);
    setTotalPortfolioValue(0);
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
  };

  const handleTrade = (tradeData) => {
    console.log('Trade executed:', tradeData);
    alert(`${tradeData.type.toUpperCase()} ${tradeData.amount} ${tradeData.token.symbol} at $${tradeData.token.price}`);
    
    // Update portfolio after trade
    if (tradeData.type === 'buy') {
      const existingHolding = portfolio.find(h => h.symbol === tradeData.token.symbol);
      if (existingHolding) {
        const updatedPortfolio = portfolio.map(h => {
          if (h.symbol === tradeData.token.symbol) {
            const newAmount = h.amount + tradeData.amount;
            const newValue = newAmount * tradeData.token.price;
            return { ...h, amount: newAmount, value: newValue };
          }
          return h;
        });
        setPortfolio(updatedPortfolio);
      } else {
        const newHolding = {
          name: tradeData.token.name,
          symbol: tradeData.token.symbol,
          amount: tradeData.amount,
          price: tradeData.token.price,
          value: tradeData.amount * tradeData.token.price,
          profit: 0
        };
        setPortfolio([...portfolio, newHolding]);
      }
    }
    
    // Recalculate total
    const newTotal = portfolio.reduce((sum, h) => sum + h.value, 0);
    setTotalPortfolioValue(newTotal);
  };

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'gainers') return matchesSearch && token.change24h > 0;
    if (filter === 'losers') return matchesSearch && token.change24h < 0;
    return matchesSearch;
  });

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title">🚀 PumpFun Washboard</h1>
            <p className="app-subtitle">Trade. Track. Profit.</p>
          </div>
          <WalletConnect 
            connected={walletConnected}
            address={walletAddress}
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
          />
        </div>
      </header>

      <main className="main-content">
        <div className="dashboard-section">
          <div className="filters-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-buttons">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${filter === 'gainers' ? 'active' : ''}`}
                onClick={() => setFilter('gainers')}
              >
                🔥 Gainers
              </button>
              <button 
                className={`filter-button ${filter === 'losers' ? 'active' : ''}`}
                onClick={() => setFilter('losers')}
              >
                📉 Losers
              </button>
            </div>
          </div>

          <div className="tokens-grid">
            {filteredTokens.map(token => (
              <TokenCard 
                key={token.id}
                token={token}
                onClick={handleTokenSelect}
              />
            ))}
          </div>
        </div>

        <div className="trading-section">
          <div className="chart-container">
            {selectedToken && (
              <PriceChart 
                data={chartData}
                tokenSymbol={selectedToken.symbol}
              />
            )}
          </div>
          
          <div className="trading-container">
            {selectedToken && (
              <TradingPanel 
                token={selectedToken}
                walletConnected={walletConnected}
                onTrade={handleTrade}
              />
            )}
          </div>
        </div>

        {walletConnected && (
          <div className="portfolio-section">
            <Portfolio 
              holdings={portfolio}
              totalValue={totalPortfolioValue}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 PumpFun Washboard | Built with ❤️ for the community</p>
        <div className="footer-links">
          <a href="#docs">Docs</a>
          <a href="#support">Support</a>
          <a href="#twitter">Twitter</a>
          <a href="#discord">Discord</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
