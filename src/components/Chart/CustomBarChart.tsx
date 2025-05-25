import React from "react";
import {
  Box,
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


interface CustomBarChartProps {
  data: { name: string; value: number }[];
  formatterFunc: (value: number) => string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data, formatterFunc }) => {

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
            formatter={(value: number) => formatterFunc(value)}
            contentStyle={{ fontSize: "0.8rem" }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#A47EF2">
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: number) => formatterFunc(val)}
              style={{ fill: "#333", fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
