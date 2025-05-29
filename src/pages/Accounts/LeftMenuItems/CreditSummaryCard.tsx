import React from 'react';
import { Box, Paper } from '@mui/material';
import InfoRow from './InfoRow';

const CreditSummaryCard: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        p: 2,
        // width: '300px',
      }}
    >
      <Box>
        <InfoRow label="Credit limit" value="$51.82K" />
        <InfoRow label="Balance" value="$16.99K" />
        <InfoRow label="AR balance" value="$26.9K" />
        <InfoRow label="Credit utilization" value="32.78%" />
        <InfoRow label="Wallet balance" value="$3.5K" />
        <InfoRow label="Credit terms" value="Net 30" />
        <InfoRow label="DSO" value="118" />
      </Box>
    </Paper>
  );
};

export default CreditSummaryCard;
