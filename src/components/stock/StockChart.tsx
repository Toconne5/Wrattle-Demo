import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockChartProps {
  symbol: string;
  currentPrice: number;
  priceChange: number;
  percentChange: number;
}

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  ma50?: number;
  ma100?: number;
}

export const StockChart: React.FC<StockChartProps> = ({ 
  symbol, 
  currentPrice, 
  priceChange, 
  percentChange 
}) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | 'QTD' | '3M' | 'YTD' | '1Y' | '3Y' | '5Y' | '10Y'>('1D');
  const [loading, setLoading] = useState(true);

  // Generate realistic intraday chart data
  const generateIntraDayData = () => {
    const data: ChartDataPoint[] = [];
    const basePrice = currentPrice - priceChange; // Starting price
    const totalPoints = 78; // 6.5 hours * 12 (every 5 minutes)
    
    for (let i = 0; i < totalPoints; i++) {
      const hour = 9 + Math.floor(i / 12); // Start at 9:30 AM
      const minute = (i % 12) * 5 + 30;
      
      // Convert to regular time (not military)
      let displayHour = hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      if (hour > 12) displayHour = hour - 12;
      if (hour === 0) displayHour = 12;
      
      const timeStr = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
      
      // Create realistic price movement
      const progress = i / totalPoints;
      const randomWalk = (Math.random() - 0.5) * 2; // Random fluctuation
      const trend = priceChange * progress; // Overall trend for the day
      const price = basePrice + trend + randomWalk;
      
      data.push({
        time: timeStr,
        price: Math.max(price, basePrice * 0.95), // Prevent extreme drops
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    // Ensure last point matches current price
    data[data.length - 1].price = currentPrice;
    return data;
  };

  // Generate historical data for different timeframes
  const generateHistoricalData = (timeframe: string) => {
    const data: ChartDataPoint[] = [];
    let points: number;
    let basePrice = currentPrice;
    
    // Calculate days for each timeframe
    switch (timeframe) {
      case '1W':
        points = 7;
        break;
      case '1M':
        points = 30;
        break;
      case 'QTD': // Quarter to Date (approximately 90 days max)
        const quarterStart = new Date();
        quarterStart.setMonth(Math.floor(quarterStart.getMonth() / 3) * 3, 1);
        points = Math.ceil((Date.now() - quarterStart.getTime()) / (1000 * 60 * 60 * 24));
        break;
      case '3M':
        points = 90;
        break;
      case 'YTD': // Year to Date
        const yearStart = new Date(new Date().getFullYear(), 0, 1);
        points = Math.ceil((Date.now() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
        break;
      case '1Y':
        points = 365;
        break;
      case '3Y':
        points = 365 * 3;
        break;
      case '5Y':
        points = 365 * 5;
        break;
      case '10Y':
        points = 365 * 10;
        break;
      default:
        return generateIntraDayData();
    }
    
    // Generate price data
    const prices: number[] = [];
    for (let i = 0; i < points; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (points - i - 1));
      
      // Create realistic historical movement
      const volatility = Math.random() * 10 - 5; // ±5% daily volatility
      const trendFactor = (Math.random() - 0.5) * 0.1; // Small trend factor
      basePrice = basePrice * (1 + (volatility + trendFactor) / 100);
      prices.push(Math.max(basePrice, currentPrice * 0.5));
    }
    
    // Calculate moving averages
    const calculateMovingAverage = (prices: number[], period: number) => {
      const ma: (number | undefined)[] = [];
      for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) {
          ma.push(undefined);
        } else {
          const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
          ma.push(sum / period);
        }
      }
      return ma;
    };
    
    const ma50 = calculateMovingAverage(prices, 50);
    const ma100 = calculateMovingAverage(prices, 100);
    
    // Build final data array
    for (let i = 0; i < points; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (points - i - 1));
      
      let timeLabel: string;
      if (timeframe === '1W') {
        timeLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (timeframe === '1M' || timeframe === 'QTD') {
        timeLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (timeframe === '3M' || timeframe === 'YTD') {
        timeLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // For 1Y, 3Y, 5Y, 10Y - show month/year
        timeLabel = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }
      
      data.push({
        time: timeLabel,
        price: prices[i],
        volume: Math.floor(Math.random() * 5000000) + 1000000,
        ma50: ma50[i],
        ma100: ma100[i]
      });
    }
    
    // Ensure last point matches current price
    data[data.length - 1].price = currentPrice;
    return data;
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = generateHistoricalData(timeframe);
      setChartData(data);
      setLoading(false);
    }, 300);
  }, [timeframe, symbol, currentPrice]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-semibold text-gray-900">
            ${data.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">
            Volume: {(data.volume / 1000000).toFixed(1)}M
          </p>
        </div>
      );
    }
    return null;
  };

  const isPositive = priceChange >= 0;
  const chartColor = isPositive ? '#10B981' : '#EF4444';

  return (
    <div className="w-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
          <span className="text-lg font-semibold text-gray-900">
            {timeframe} Price Chart
          </span>
        </div>
        
        {/* Live Data Indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Live Data</span>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex flex-wrap gap-1 mb-4 bg-gray-100 rounded-lg p-1">
        {(['1D', '1W', '1M', 'QTD', '3M', 'YTD', '1Y', '3Y', '5Y', '10Y'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeframe === tf
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {loading ? (
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={['dataMin - 2', 'dataMax + 2']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `${value.toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Main Price Line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: chartColor, strokeWidth: 2, fill: 'white' }}
                />
                
                {/* 50-Day Moving Average */}
                {timeframe !== '1D' && (
                  <Line
                    type="monotone"
                    dataKey="ma50"
                    stroke="#8B5CF6"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={false}
                  />
                )}
                
                {/* 100-Day Moving Average */}
                {timeframe !== '1D' && timeframe !== '1W' && (
                  <Line
                    type="monotone"
                    dataKey="ma100"
                    stroke="#F59E0B"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    connectNulls={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Chart Stats */}
      <div className="mt-4 space-y-3">
        {/* Moving Average Legend */}
        {timeframe !== '1D' && (
          <div className="flex items-center justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-purple-500" style={{ background: 'repeating-linear-gradient(to right, #8B5CF6 0, #8B5CF6 5px, transparent 5px, transparent 10px)' }}></div>
              <span className="text-gray-600">50-Day MA</span>
            </div>
            {timeframe !== '1W' && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-amber-500" style={{ background: 'repeating-linear-gradient(to right, #F59E0B 0, #F59E0B 3px, transparent 3px, transparent 6px)' }}></div>
                <span className="text-gray-600">100-Day MA</span>
              </div>
            )}
          </div>
        )}
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Today's Range</p>
            <p className="text-sm font-semibold text-gray-900">
              ${(currentPrice * 0.98).toFixed(2)} - ${(currentPrice * 1.02).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Volume</p>
            <p className="text-sm font-semibold text-gray-900">
              {(Math.random() * 50 + 10).toFixed(1)}M
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">52W Range</p>
            <p className="text-sm font-semibold text-gray-900">
              ${(currentPrice * 0.7).toFixed(0)} - ${(currentPrice * 1.4).toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};