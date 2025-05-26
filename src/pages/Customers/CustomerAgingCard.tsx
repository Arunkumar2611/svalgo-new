import React from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Divider,
} from "@mui/material";

const agingData = [
  { label: "Current", amount: "$0", percent: 0, color: "#E53935" },
  { label: "1 - 10 days", amount: "$6.5K", percent: 10, color: "#E53935" },
  { label: "11 - 20 days", amount: "$13K", percent: 30, color: "#FB8C00" },
  { label: "21 - 30 days", amount: "$0", percent: 10, color: "#E53935" },
  { label: "31 - 40 days", amount: "$300.5K", percent: 90, color: "#43A047" },
  { label: "41+ days", amount: "$14K", percent: 10, color: "#E53935" },
];

const CustomProgressBar = ({ value, color }) => (
  <Box sx={{ width: "100%", mt: 1 }}>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 5,
        backgroundColor: "#E0E0E0",
        "& .MuiLinearProgress-bar": {
          backgroundColor: color,
          borderRadius: 5,
        },
      }}
    />
  </Box>
);

const CustomerAgingCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff",
        border: "2px solid #eee",
        maxWidth: 400,
      }}
    >
      {agingData.map((item, index) => (
        <Box key={index} mb={index !== agingData.length - 1 ? 2 : 0}>
          {/* Row: Label and Amount */}
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500}>{item.label}</Typography>
            <Typography fontWeight={700}>{item.amount}</Typography>
          </Box>

          {/* Progress Bar */}
          <CustomProgressBar value={item.percent} color={item.color} />

          {/* Percentage */}
          <Box display="flex" justifyContent="flex-end" mt={0.5}>
            <Typography variant="body2" color="textSecondary">
              {item.percent}%
            </Typography>
          </Box>

          {/* Divider */}
          {index !== agingData.length - 1 && (
            <Divider sx={{ mt: 2, mb: 2 }} />
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default CustomerAgingCard;
