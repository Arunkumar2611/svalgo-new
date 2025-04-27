import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue: string | number;
  backgroundColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, backgroundColor = '#f2faff' }) => {
  return (
    <Box
      sx={{
        backgroundColor,
        borderRadius: 2,
        p: 2,
        textAlign: 'left',
        minWidth: 100,
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="body2" color="text.secondary" mb={1}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subValue}
      </Typography>
    </Box>
  );
};

export default StatCard;
