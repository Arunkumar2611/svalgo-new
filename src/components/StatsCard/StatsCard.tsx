import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface StatsCardProps {
  title: string;
  value: string | number;
  percentage: string | number;
  showLink?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, showLink }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0px 1px 2px rgba(10, 12.67, 18, 0.05)",
        borderRadius: "12px",
        outline: "1px solid #E9EAEB",
        outlineOffset: "-1px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "8px",
        position: "relative",
        fontFamily: "Inter",
      }}
    >
      {/* Top Row: Title + Optional Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            color: "#535862",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        >
          {title}
        </Typography>
        {showLink && (
          <IconButton
            size="small"
            sx={{ padding: 0, color: "#B0B4BA" }}
            aria-label="Open"
          >
            <OpenInNewIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        )}
      </Box>

      {/* Main Value + Percentage */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography
          sx={{
            color: "#181D27",
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        >
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <TrendingUpIcon sx={{ color: "#17B26A", fontSize: "18px" }} />
          <Typography
            sx={{
              color: "#067647",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            {percentage}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatsCard;
