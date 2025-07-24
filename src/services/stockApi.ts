// services/stockApi.ts
const ALPHA_VANTAGE_API_KEY = 'XPZILWK5QT6XU80V'; // Replace with your actual API key
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  description: string;
  marketCap: string;
  peRatio: number | null;
  high: number;
  low: number;
  volume: string;
}

// Cache to avoid hitting API limits
const stockCache: { [key: string]: { data: StockData; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    // Check cache first
    const cached = stockCache[symbol];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Fetch real-time quote
    const quoteResponse = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const quoteData = await quoteResponse.json();

    // Fetch company overview
    const overviewResponse = await fetch(
      `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const overviewData = await overviewResponse.json();

    // Check for API errors
    if (quoteData['Error Message'] || overviewData['Error Message']) {
      console.error('API Error:', quoteData['Error Message'] || overviewData['Error Message']);
      return null;
    }

    // Check for rate limit
    if (quoteData['Note'] || overviewData['Note']) {
      console.warn('API Rate limit reached');
      return getFallbackData(symbol);
    }

    const quote = quoteData['Global Quote'];
    const overview = overviewData;

    if (!quote || !overview) {
      return getFallbackData(symbol);
    }

    const stockData: StockData = {
      symbol: symbol,
      name: overview['Name'] || `${symbol} Inc.`,
      price: parseFloat(quote['05. price']) || 0,
      change: parseFloat(quote['09. change']) || 0,
      changePercent: parseFloat(quote['10. change percent']?.replace('%', '')) || 0,
      description: overview['Description'] || `${symbol} stock information`,
      marketCap: formatMarketCap(overview['MarketCapitalization']),
      peRatio: overview['PERatio'] ? parseFloat(overview['PERatio']) : null,
      high: parseFloat(quote['03. high']) || 0,
      low: parseFloat(quote['04. low']) || 0,
      volume: formatVolume(quote['06. volume'])
    };

    // Cache the result
    stockCache[symbol] = {
      data: stockData,
      timestamp: Date.now()
    };

    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return getFallbackData(symbol);
  }
};

// Fallback data for when API fails or rate limit hit
const getFallbackData = (symbol: string): StockData => {
  const fallbackData: { [key: string]: StockData } = {
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 189.50,
      change: 2.35,
      changePercent: 1.26,
      description: 'Technology company that designs and manufactures consumer electronics, software, and online services.',
      marketCap: '2.95T',
      peRatio: 29.8,
      high: 191.20,
      low: 186.80,
      volume: '45.2M'
    },
    'CRM': {
      symbol: 'CRM',
      name: 'Salesforce Inc.',
      price: 245.80,
      change: -3.20,
      changePercent: -1.29,
      description: 'Cloud-based software company providing customer relationship management services.',
      marketCap: '241.2B',
      peRatio: 45.2,
      high: 249.10,
      low: 243.50,
      volume: '2.8M'
    },
    'SNOW': {
      symbol: 'SNOW',
      name: 'Snowflake Inc.',
      price: 156.40,
      change: 8.90,
      changePercent: 6.03,
      description: 'Cloud computing company providing data warehouse-as-a-service.',
      marketCap: '52.1B',
      peRatio: null,
      high: 158.90,
      low: 147.50,
      volume: '4.1M'
    }
  };

  return fallbackData[symbol] || {
    symbol: symbol,
    name: `${symbol} Inc.`,
    price: 100.00,
    change: 0,
    changePercent: 0,
    description: 'Stock information not available',
    marketCap: 'N/A',
    peRatio: null,
    high: 100.00,
    low: 100.00,
    volume: 'N/A'
  };
};

// Helper functions
const formatMarketCap = (marketCap: string): string => {
  if (!marketCap || marketCap === 'None') return 'N/A';
  
  const num = parseFloat(marketCap);
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return marketCap;
};

const formatVolume = (volume: string): string => {
  if (!volume) return 'N/A';
  
  const num = parseFloat(volume);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return volume;
};

// Batch fetch multiple stocks (useful for feed)
export const fetchMultipleStocks = async (symbols: string[]): Promise<{ [key: string]: StockData }> => {
  const results: { [key: string]: StockData } = {};
  
  // Fetch stocks with delay to respect rate limits
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const data = await fetchStockData(symbol);
    if (data) {
      results[symbol] = data;
    }
    
    // Add delay between requests (Alpha Vantage allows 5 per minute)
    if (i < symbols.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 12000)); // 12 second delay
    }
  }
  
  return results;
};