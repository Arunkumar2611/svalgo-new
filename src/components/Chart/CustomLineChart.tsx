import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface ChartDataItem {
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  label: string;
  highlightDotOnDate?: string;
  showDots?: boolean;
}

interface CustomLineChartProps {
  data: ChartDataItem[];
  lines: LineConfig[];
  referenceLineDate?: string;
  referenceLineColor?: string;
}

const CustomLineChart = ({
  data,
  lines,
  referenceLineDate,
  referenceLineColor = "#B3F262",
}: CustomLineChartProps) => {
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#eee" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis tickFormatter={(v) => `${v}D`} stroke="#888" />
          <Tooltip />

          {/* Optional Reference Line */}
          {referenceLineDate && (
            <ReferenceLine
              x={referenceLineDate}
              stroke={referenceLineColor}
              strokeDasharray="3 3"
            />
          )}

          {/* Dynamically render lines */}
          {lines.map(({ dataKey, stroke, strokeWidth, highlightDotOnDate, showDots = true }) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={strokeWidth || 2}
              dot={
                highlightDotOnDate
                  ? ({ cx, cy, payload }) =>
                    payload.date === highlightDotOnDate ? (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={stroke}
                        stroke="#fff"
                        strokeWidth={strokeWidth || 2}
                      />
                    ) : (
                      <></>
                    )
                  : showDots
              }
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Dynamic Legend */}
      <Box display="flex" gap={3} mt={2} pl={1}>
        {lines.map(({ label, stroke }) => (
          <LegendItem key={label} color={stroke} label={label} />
        ))}
      </Box>
    </Paper>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <Box display="flex" alignItems="center" gap={0.5}>
    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
    <Typography variant="caption">{label}</Typography>
  </Box>
);

export default CustomLineChart;
