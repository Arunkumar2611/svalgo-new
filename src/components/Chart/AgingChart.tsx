import React from "react";
import {
  Box,
  Card,
  Typography,
  useTheme,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "1-10", value: 6500 },
  { name: "11-20", value: 13000 },
  { name: "21-30", value: 0 },
  { name: "31-40", value: 300500 },
  { name: "41+", value: 14000 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const AgingChart: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%' }}>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%" minHeight={340}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid
            strokeDasharray="1 1"
            vertical={false}
            stroke="#e0e0e0"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            scale="point"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ fontSize: "0.8rem" }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#A47EF2">
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: number) => formatCurrency(val)}
              style={{ fill: "#333", fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AgingChart;
