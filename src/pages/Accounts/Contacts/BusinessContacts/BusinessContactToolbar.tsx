import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  MoreVert,
  FilterList,
  ReceiptLong,
  AttachMoney,
} from '@mui/icons-material';

const BusinessContactToolbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

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
        Add New Contact
      </Button>
    </Box>
  );
};

export default BusinessContactToolbar;
