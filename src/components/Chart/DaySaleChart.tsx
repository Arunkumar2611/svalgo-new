import React from "react";
import { Box, Button, ButtonGroup, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Dot,
} from "recharts";

const data = [
  {
    date: "Nov 01, 2024",
    dso: 70,
    currentDso: 45,
    overdueDso: 30,
    overdue: 25,
  },
  {
    date: "Nov 08, 2024",
    dso: 50,
    currentDso: 43,
    overdueDso: 25,
    overdue: 20,
  },
  {
    date: "Nov 15, 2024",
    dso: 65,
    currentDso: 65,
    overdueDso: 35,
    overdue: 30,
  },
  {
    date: "Nov 22, 2024",
    dso: 40,
    currentDso: 50,
    overdueDso: 20,
    overdue: 22,
  },
  {
    date: "Nov 29, 2024",
    dso: 30,
    currentDso: 55,
    overdueDso: 40,
    overdue: 33,
  },
  {
    date: "Dec 06, 2024",
    dso: 80,
    currentDso: 48,
    overdueDso: 35,
    overdue: 27,
  },
];

const DaySaleChart = () => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 3, border: "1px solid #eee", height: "500px" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Day sales outstanding
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button>3M</Button>
          <Button variant="contained">6M</Button>
          <Button>1Y</Button>
        </ButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#eee" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis tickFormatter={(v) => `${v}D`} stroke="#888" />
          <Tooltip />
          <ReferenceLine
            x="Nov 15, 2024"
            stroke="#B3F262"
            strokeDasharray="3 3"
            label=""
          />
          <Line
            type="monotone"
            dataKey="dso"
            stroke="#885FFF"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="currentDso"
            stroke="#20C997"
            strokeWidth={2}
            dot={({ cx, cy, payload }) =>
              payload.date === "Nov 15, 2024" ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#20C997"
                  stroke="#fff"
                  strokeWidth={2}
                />
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="overdueDso"
            stroke="#F97316"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="overdue"
            stroke="#FACC15"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <Box display="flex" gap={3} mt={2} pl={1}>
        <LegendItem color="#885FFF" label="DSO" />
        <LegendItem color="#20C997" label="Current DSO" />
        <LegendItem color="#F97316" label="Overdue DSO" />
        <LegendItem color="#FACC15" label="Overdue" />
      </Box>
    </Paper>
  );
};

const LegendItem = ({ color, label }) => (
  <Box display="flex" alignItems="center" gap={0.5}>
    <Box
      sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }}
    />
    <Typography variant="caption">{label}</Typography>
  </Box>
);


export default DaySaleChart