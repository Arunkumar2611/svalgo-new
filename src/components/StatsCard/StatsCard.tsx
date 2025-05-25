import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string | number;
  showLink?: string;
  background?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, background }) => {
  return (
    <Box
      sx={{
        minWidth: "207px",
        width: "100%",
        minHeight: "120px",
        p: "20px",
        backgroundColor:background ? background : '#FFFFFF',
        borderRadius: "12px",
        outline: "1px solid #E9EAEB",
        outlineOffset: "-1px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "8px",
        fontFamily: "Inter",
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "#717680", lineHeight: "20px" }}>
        {title}
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: "30px", color: "#181D27", lineHeight: "38px" }}>
        {value}
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "#717680", lineHeight: "20px" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default StatsCard;
