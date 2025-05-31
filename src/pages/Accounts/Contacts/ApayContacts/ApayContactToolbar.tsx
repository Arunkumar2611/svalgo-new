import React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import {
  Add,
} from '@mui/icons-material';

const ApayContactToolbar: React.FC = () => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        startIcon={<Add />}
        variant="contained"
        sx={{
          background: '#7F56D9',
          color: '#fff',
          borderRadius: 1.5,
          textTransform: 'none',
        }}
      >
        New Apay Contact
      </Button>
    </Box>
  );
};

export default ApayContactToolbar;
