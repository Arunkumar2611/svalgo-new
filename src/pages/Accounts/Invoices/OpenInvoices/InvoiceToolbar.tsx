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

const InvoiceToolbar: React.FC = () => {
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
        Create invoice
      </Button>

      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ReceiptLong fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send invoice</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <AttachMoney fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send payment link</ListItemText>
        </MenuItem>
      </Menu>

      <IconButton>
        <FilterList />
      </IconButton>
    </Box>
  );
};

export default InvoiceToolbar;
