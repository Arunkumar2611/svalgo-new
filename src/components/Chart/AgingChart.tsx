import React from "react";
import {
  Box,
  useTheme,
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
  { name: "July 07", value: 17500000 },
  { name: "July 08", value: 14100000 },
  { name: "July 10", value: 12000000 },
  { name: "July 11", value: 4800000 },
  { name: "July 12", value: 10950000 },
  { name: "July 13", value: 14600000 },
  { name: "July 14", value: 1200000 },
];

const formatMillions = (value: number) => {
  return `${(value / 1000000).toFixed(1)}M`;
};

const AgingChart: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%' }}>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} barSize={40} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            scale="point"
            padding={{ left: 30, right: 30 }}
            style={{ fontSize: 12 }}
          />
          <YAxis
            domain={[0, 20000000]}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000000)}M`}
            style={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => formatMillions(value)}
            contentStyle={{ fontSize: "0.8rem" }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#A47EF2">
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: number) => formatMillions(val)}
              style={{ fill: "#333", fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AgingChart;
