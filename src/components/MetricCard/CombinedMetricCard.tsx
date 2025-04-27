// File: src/components/SplitMetricCard.js
import React from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const SplitMetricCard = ({ metrics }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 0,
        border: '1px solid #E0E0E0',
        backgroundColor: '#FFF9F9',
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {metrics.map((metric, idx) => (
        <Box
          key={idx}
          flex={1}
          pr={idx === 0 ? 2 : 0}
          pl={idx === 1 ? 2 : 0}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {idx === 1 && (
            <Divider orientation="vertical" flexItem sx={{ position: 'absolute', left: '50%' }} />
          )}
          <Typography variant="body2" color="textSecondary">
            {metric.label}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="h6" fontWeight="bold">
              {metric.value}
            </Typography>
            {metric.percentage && (
              <Box
                display="flex"
                alignItems="center"
                color={metric.isNegative ? 'error.main' : 'success.main'}
              >
                {metric.isNegative ? (
                  <TrendingDownIcon fontSize="small" />
                ) : (
                  <TrendingUpIcon fontSize="small" />
                )}
                <Typography variant="caption" fontWeight="medium">
                  {metric.percentage}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default SplitMetricCard;
