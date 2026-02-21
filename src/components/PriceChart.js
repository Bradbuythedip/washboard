import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PriceChart.css';

const PriceChart = ({ data, tokenSymbol }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Price: $${payload[0].value.toFixed(6)}`}</p>
          <p className="tooltip-time">{formatTime(payload[0].payload.time)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="price-chart">
      <h3 className="chart-title">{tokenSymbol} Price Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            stroke="#666"
          />
          <YAxis 
            stroke="#666"
            tickFormatter={(value) => `$${value.toFixed(4)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#667eea" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
