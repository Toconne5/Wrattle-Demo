import { useQuery } from '@tanstack/react-query';
import { fetchStockData, StockData } from '../services/stockApi';

export function useStockData(symbol: string | null) {
  return useQuery<StockData | null>({
    queryKey: ['stock', symbol],
    queryFn: () => fetchStockData(symbol!),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes — matches the old manual cache
    retry: 1,
  });
}
