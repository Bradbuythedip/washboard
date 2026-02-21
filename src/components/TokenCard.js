import React from 'react';
import './TokenCard.css';

const TokenCard = ({ token, onClick }) => {
  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toFixed(6)}` : '$0.000000';
  };

  const formatMarketCap = (mcap) => {
    if (!mcap) return '$0';
    if (mcap >= 1000000) return `$${(mcap / 1000000).toFixed(2)}M`;
    if (mcap >= 1000) return `$${(mcap / 1000).toFixed(2)}K`;
    return `$${mcap.toFixed(2)}`;
  };

  const formatVolume = (vol) => {
    if (!vol) return '$0';
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(2)}M`;
    if (vol >= 1000) return `$${(vol / 1000).toFixed(2)}K`;
    return `$${vol.toFixed(2)}`;
  };

  const getPriceChangeClass = (change) => {
    if (change > 0) return 'price-change positive';
    if (change < 0) return 'price-change negative';
    return 'price-change';
  };

  return (
    <div className="token-card" onClick={() => onClick(token)}>
      <div className="token-header">
        <div className="token-icon">{token.symbol?.charAt(0) || '?'}</div>
        <div className="token-info">
          <h3 className="token-name">{token.name || 'Unknown Token'}</h3>
          <span className="token-symbol">{token.symbol || 'UNKNOWN'}</span>
        </div>
      </div>
      
      <div className="token-stats">
        <div className="stat-row">
          <span className="stat-label">Price:</span>
          <span className="stat-value">{formatPrice(token.price)}</span>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">24h Change:</span>
          <span className={getPriceChangeClass(token.change24h)}>
            {token.change24h > 0 ? '+' : ''}{token.change24h?.toFixed(2) || '0.00'}%
          </span>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Market Cap:</span>
          <span className="stat-value">{formatMarketCap(token.marketCap)}</span>
        </div>
        
        <div className="stat-row">
          <span className="stat-label">Volume 24h:</span>
          <span className="stat-value">{formatVolume(token.volume24h)}</span>
        </div>
      </div>

      <div className="token-actions">
        <button className="trade-button buy">Buy</button>
        <button className="trade-button sell">Sell</button>
      </div>
    </div>
  );
};

export default TokenCard;
