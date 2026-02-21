import React from 'react';
import './WalletConnect.css';

const WalletConnect = ({ connected, address, onConnect, onDisconnect }) => {
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div className="wallet-connect">
      {!connected ? (
        <button className="connect-button" onClick={onConnect}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">{formatAddress(address)}</span>
          <button className="disconnect-button" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
