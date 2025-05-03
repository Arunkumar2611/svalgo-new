import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {  Typography, Box } from "@mui/material";

const data = [
  { name: "Sep 2024", value1: 81, value2: 36 },
  { name: "Oct 2024", value1: 76, value2: 79 },
  { name: "Trailing 30 days", value1: 60, value2: 39 },
];

import { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: 2,
        }}
      >
        {payload.map((entry, index) => (
          <Typography
            key={index}
            variant="body2"
            color={entry.color}
          >{`${entry.name}: ${entry.value}%`}</Typography>
        ))}
      </Box>
    );
  }

  return null;
};

const AROutstandingChart = () => {
  return (
    <ResponsiveContainer width="100%" height={466}>
      <BarChart
        data={data}
        barCategoryGap="20%"
        margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
      >
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: 14 }}
        />
        <YAxis
          tickFormatter={(val) => `${val}%`}
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 14 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value1" fill="#6B21A8" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="value1"
            position="top"
            formatter={(v: any) => `${v}%`}
          />
        </Bar>
        <Bar dataKey="value2" fill="#A855F7" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="value2"
            position="top"
            formatter={(v: any) => `${v}%`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AROutstandingChart;
