
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface AssetAllocationProps {
  selectedAccount: string;
}

const AssetAllocation = ({ selectedAccount }: AssetAllocationProps) => {
  const allocationData = {
    personal: {
      data: [
        { name: 'Individual Stocks', value: 85, color: '#4DA8DA' },
        { name: 'Cash', value: 15, color: '#A6E1FA' }
      ],
      riskLevel: 'Aggressive',
      riskColor: 'text-orange-600',
      description: 'High growth potential with higher volatility'
    },
    utma: {
      data: [
        { name: 'ETFs', value: 90, color: '#4DA8DA' },
        { name: 'Cash', value: 10, color: '#A6E1FA' }
      ],
      riskLevel: 'Moderate',
      riskColor: 'text-yellow-600',
      description: 'Balanced approach with diversified ETFs'
    },
    plan529: {
      data: [
        { name: 'Mutual Funds', value: 95, color: '#4DA8DA' },
        { name: 'Cash', value: 5, color: '#A6E1FA' }
      ],
      riskLevel: 'Conservative',
      riskColor: 'text-green-600',
      description: 'Long-term growth with lower risk'
    }
  };

  const currentAllocation = allocationData[selectedAccount as keyof typeof allocationData];

  return (
    <Card className="shadow-lg border-[#4DA8DA]/20">
      <CardHeader>
        <CardTitle className="text-[#002E5D]">Asset Allocation & Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentAllocation.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currentAllocation.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-[#002E5D] mb-2">Risk Profile</h3>
              <p className={`text-2xl font-bold ${currentAllocation.riskColor}`}>
                {currentAllocation.riskLevel}
              </p>
              <p className="text-gray-600 mt-2">{currentAllocation.description}</p>
            </div>
            <div className="space-y-2">
              {currentAllocation.data.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
