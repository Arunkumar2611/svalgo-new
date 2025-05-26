import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

const CustomerStatCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff",
        border: "2px solid #eee",
        maxWidth: 360,
      }}
    >
      {/* Customer */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography fontWeight={500}>Customer</Typography>
        <Typography fontWeight={700}>29</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Balance */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography fontWeight={500}>Balance</Typography>
        <Typography fontWeight={700}>$436.14K</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Credit Utilization */}
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight={500}>Credit utilization</Typography>
        <Typography fontWeight={700}>29.23%</Typography>
      </Box>
    </Paper>
  );
};

export default CustomerStatCard;
