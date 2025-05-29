import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1.5}
      borderBottom="1px solid #E5E7EB"
      sx={{ '&:last-child': { borderBottom: 'none' } }}
    >
      <Typography fontSize="14px" fontWeight={500} color="#4B5563">
        {label}
      </Typography>
      <Typography fontSize="14px" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
};

export default InfoRow;
