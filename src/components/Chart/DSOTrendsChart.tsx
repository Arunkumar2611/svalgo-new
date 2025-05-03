import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import CustomTooltip from "../CustomTooltip/CustomTooltip";

const data = [
    {
      date: "Nov 01, 2024",
      upper: 600,
      lower: 400,
    },
    {
      date: "Nov 08, 2024",
      upper: 670,
      lower: 430,
    },
    {
      date: "Nov 15, 2024",
      upper: 720,
      lower: 450,
    },
    {
      date: "Nov 22, 2024",
      upper: 750,
      lower: 460,
    },
    {
      date: "Nov 29, 2024",
      upper: 770,
      lower: 470,
    },
    {
      date: "Dec 06, 2024",
      upper: 780,
      lower: 480,
    },
    {
      date: "Dec 13, 2024",
      upper: 800,
      lower: 490,
    },
    {
      date: "Dec 20, 2024",
      upper: 900,
      lower: 540,
    },
  ];

const DSOTrendsChart = () => {
    return (
          <ResponsiveContainer width="100%" height={466}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} padding={{ left: 50, right: 50 }} />
              <YAxis tickFormatter={(value) => `${value}M`} domain={[0, 1200]} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "transparent" }} />
              <Line type="monotone" dataKey="upper" stroke="#B45309" strokeWidth={4} dot={false} />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#8B5CF6"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
    );
  };
  
  export default DSOTrendsChart;