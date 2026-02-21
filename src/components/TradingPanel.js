import React, { useState } from 'react';
import './TradingPanel.css';

const TradingPanel = ({ token, walletConnected, onTrade }) => {
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [slippage, setSlippage] = useState(1);

  const handleTrade = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onTrade({
      type: tradeType,
      amount: parseFloat(amount),
      token: token,
      slippage: slippage
    });
  };

  const calculateTotal = () => {
    if (!amount || !token?.price) return '0.00';
    const total = parseFloat(amount) * token.price;
    return total.toFixed(2);
  };

  return (
    <div className="trading-panel">
      <h3 className="panel-title">Trade {token?.symbol || 'Token'}</h3>
      
      <div className="trade-type-selector">
        <button 
          className={`type-button ${tradeType === 'buy' ? 'active buy' : ''}`}
          onClick={() => setTradeType('buy')}
        >
          Buy
        </button>
        <button 
          className={`type-button ${tradeType === 'sell' ? 'active sell' : ''}`}
          onClick={() => setTradeType('sell')}
        >
          Sell
        </button>
      </div>

      <div className="input-group">
        <label className="input-label">Amount ({token?.symbol || 'TOKEN'})</label>
        <input
          type="number"
          className="trade-input"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label className="input-label">Slippage Tolerance (%)</label>
        <div className="slippage-selector">
          <button 
            className={`slippage-button ${slippage === 0.5 ? 'active' : ''}`}
            onClick={() => setSlippage(0.5)}
          >
            0.5%
          </button>
          <button 
            className={`slippage-button ${slippage === 1 ? 'active' : ''}`}
            onClick={() => setSlippage(1)}
          >
            1%
          </button>
          <button 
            className={`slippage-button ${slippage === 2 ? 'active' : ''}`}
            onClick={() => setSlippage(2)}
          >
            2%
          </button>
          <input
            type="number"
            className="slippage-input"
            placeholder="Custom"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
            min="0"
            max="50"
            step="0.1"
          />
        </div>
      </div>

      <div className="trade-summary">
        <div className="summary-row">
          <span>Price per token:</span>
          <span>${token?.price?.toFixed(6) || '0.000000'}</span>
        </div>
        <div className="summary-row">
          <span>Total:</span>
          <span className="total-amount">${calculateTotal()}</span>
        </div>
      </div>

      <button 
        className={`execute-button ${tradeType}`}
        onClick={handleTrade}
        disabled={!walletConnected}
      >
        {walletConnected ? `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${token?.symbol || 'Token'}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default TradingPanel;
