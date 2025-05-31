import React from 'react';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

type Props = {
  onAddClick: () => void;
};


const ApayContactToolbar: React.FC<Props> = ({ onAddClick }) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        startIcon={<Add />}
        variant="contained"
        onClick={onAddClick}
        sx={{
          background: '#7F56D9',
          color: '#fff',
          borderRadius: 1.5,
          textTransform: 'none',
        }}
      >
        New Payable Contact
      </Button>
    </Box>
  );
};

export default ApayContactToolbar;
