import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';

// PumpFun Program ID on Solana
const PUMPFUN_PROGRAM_ID = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';

// Helius RPC connection
const HELIUS_API_KEY = process.env.REACT_APP_HELIUS_API_KEY || '1e6f062f-0834-4ebe-b480-3e3ff71e3617';
const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// Initialize Solana connection
const connection = new Connection(RPC_URL, 'confirmed');

// PumpFun API endpoints
const PUMPFUN_API_BASE = 'https://frontend-api.pump.fun';

/**
 * Fetch all tokens from PumpFun
 */
export const fetchPumpFunTokens = async (limit = 50, offset = 0) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins`, {
      params: {
        limit,
        offset,
        sort: 'last_trade_timestamp',
        order: 'DESC',
        includeNsfw: false
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching PumpFun tokens:', error);
    throw error;
  }
};

/**
 * Fetch specific token data
 */
export const fetchTokenData = async (mintAddress) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins/${mintAddress}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching token ${mintAddress}:`, error);
    throw error;
  }
};

/**
 * Fetch token trades/transactions
 */
export const fetchTokenTrades = async (mintAddress, limit = 100) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/trades/${mintAddress}`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching trades for ${mintAddress}:`, error);
    throw error;
  }
};

/**
 * Get token holders
 */
export const fetchTokenHolders = async (mintAddress) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins/${mintAddress}/holders`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching holders for ${mintAddress}:`, error);
    throw error;
  }
};

/**
 * Search tokens by name or symbol
 */
export const searchTokens = async (query) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching tokens:', error);
    throw error;
  }
};

/**
 * Get trending tokens
 */
export const fetchTrendingTokens = async () => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    throw error;
  }
};

/**
 * Get token price history for charts
 */
export const fetchTokenPriceHistory = async (mintAddress, interval = '1h', limit = 24) => {
  try {
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins/${mintAddress}/price-history`, {
      params: { interval, limit }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching price history for ${mintAddress}:`, error);
    // Return mock data if API fails
    return generateMockPriceHistory();
  }
};

/**
 * Get account balance using Helius RPC
 */
export const getAccountBalance = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
};

/**
 * Get token accounts for a wallet
 */
export const getTokenAccounts = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
    );
    
    return tokenAccounts.value.map(account => ({
      pubkey: account.pubkey.toString(),
      mint: account.account.data.parsed.info.mint,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount,
      decimals: account.account.data.parsed.info.tokenAmount.decimals
    }));
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    throw error;
  }
};

/**
 * Format token data from API to our app format
 */
export const formatTokenData = (apiToken) => {
  return {
    id: apiToken.mint,
    mint: apiToken.mint,
    name: apiToken.name || 'Unknown Token',
    symbol: apiToken.symbol || 'UNKNOWN',
    description: apiToken.description || '',
    image: apiToken.image_uri || apiToken.image,
    price: parseFloat(apiToken.price || apiToken.usd_market_cap / apiToken.total_supply || 0),
    marketCap: parseFloat(apiToken.usd_market_cap || 0),
    volume24h: parseFloat(apiToken.volume_24h || 0),
    change24h: calculatePriceChange(apiToken),
    liquidity: parseFloat(apiToken.liquidity || 0),
    holders: parseInt(apiToken.holder_count || 0),
    creator: apiToken.creator,
    createdAt: apiToken.created_timestamp,
    lastTradeAt: apiToken.last_trade_timestamp,
    isComplete: apiToken.complete || false,
    isTrending: apiToken.is_trending || false
  };
};

/**
 * Calculate 24h price change percentage
 */
const calculatePriceChange = (token) => {
  if (token.price_change_24h !== undefined) {
    return parseFloat(token.price_change_24h);
  }
  
  // Calculate from price history if available
  if (token.price_24h_ago && token.price) {
    const oldPrice = parseFloat(token.price_24h_ago);
    const newPrice = parseFloat(token.price);
    return ((newPrice - oldPrice) / oldPrice) * 100;
  }
  
  return 0;
};

/**
 * Generate mock price history (fallback)
 */
const generateMockPriceHistory = () => {
  const data = [];
  const now = Date.now();
  const basePrice = Math.random() * 0.01;
  
  for (let i = 24; i >= 0; i--) {
    const time = now - (i * 60 * 60 * 1000);
    const variance = (Math.random() - 0.5) * 0.1;
    const price = basePrice * (1 + variance);
    data.push({ time, price });
  }
  
  return data;
};

/**
 * Get connection instance
 */
export const getConnection = () => connection;

/**
 * Health check for APIs
 */
export const checkApiHealth = async () => {
  try {
    // Check Helius RPC
    const version = await connection.getVersion();
    
    // Check PumpFun API
    const response = await axios.get(`${PUMPFUN_API_BASE}/coins?limit=1`);
    
    return {
      helius: { connected: true, version },
      pumpfun: { connected: true, status: response.status }
    };
  } catch (error) {
    console.error('API health check failed:', error);
    return {
      helius: { connected: false },
      pumpfun: { connected: false }
    };
  }
};

export default {
  fetchPumpFunTokens,
  fetchTokenData,
  fetchTokenTrades,
  fetchTokenHolders,
  searchTokens,
  fetchTrendingTokens,
  fetchTokenPriceHistory,
  getAccountBalance,
  getTokenAccounts,
  formatTokenData,
  getConnection,
  checkApiHealth
};
