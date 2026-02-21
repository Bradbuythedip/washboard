import React from 'react';
import './Portfolio.css';

const Portfolio = ({ holdings, totalValue }) => {
  const formatValue = (value) => {
    return value ? `$${value.toFixed(2)}` : '$0.00';
  };

  const formatAmount = (amount) => {
    return amount ? amount.toFixed(4) : '0.0000';
  };

  const getPercentage = (value) => {
    if (!totalValue || totalValue === 0) return 0;
    return ((value / totalValue) * 100).toFixed(2);
  };

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Your Portfolio</h2>
        <div className="portfolio-total">
          <span className="total-label">Total Value:</span>
          <span className="total-value">{formatValue(totalValue)}</span>
        </div>
      </div>

      <div className="holdings-list">
        {holdings && holdings.length > 0 ? (
          holdings.map((holding, index) => (
            <div key={index} className="holding-item">
              <div className="holding-header">
                <div className="holding-icon">{holding.symbol?.charAt(0) || '?'}</div>
                <div className="holding-info">
                  <h4 className="holding-name">{holding.name}</h4>
                  <span className="holding-symbol">{holding.symbol}</span>
                </div>
                <div className="holding-value">
                  {formatValue(holding.value)}
                </div>
              </div>
              
              <div className="holding-details">
                <div className="detail-row">
                  <span>Amount:</span>
                  <span>{formatAmount(holding.amount)} {holding.symbol}</span>
                </div>
                <div className="detail-row">
                  <span>Price:</span>
                  <span>{formatValue(holding.price)}</span>
                </div>
                <div className="detail-row">
                  <span>Allocation:</span>
                  <span>{getPercentage(holding.value)}%</span>
                </div>
                {holding.profit !== undefined && (
                  <div className="detail-row">
                    <span>P&L:</span>
                    <span className={holding.profit >= 0 ? 'profit positive' : 'profit negative'}>
                      {holding.profit >= 0 ? '+' : ''}{formatValue(holding.profit)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-portfolio">
            <p>No holdings yet</p>
            <p className="empty-subtitle">Connect your wallet and start trading!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
