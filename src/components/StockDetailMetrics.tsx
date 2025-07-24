
interface StockDetailMetricsProps {
  marketCap: string;
  peRatio: number | null;
  volume: string;
  low: number;
  high: number;
}

export const StockDetailMetrics = ({ marketCap, peRatio, volume, low, high }: StockDetailMetricsProps) => {
  return (
    <div className="p-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-600">Market Cap</p>
          <p className="font-semibold">{marketCap}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">P/E Ratio</p>
          <p className="font-semibold">{peRatio?.toFixed(1) || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Volume</p>
          <p className="font-semibold">{volume}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Day Range</p>
          <p className="font-semibold">${low.toFixed(2)} - ${high.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
