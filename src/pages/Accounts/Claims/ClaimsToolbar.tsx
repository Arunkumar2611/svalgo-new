import React, { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Add,
  MoreVert,
  FilterList,
  ReceiptLong,
  AttachMoney,
} from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ClaimsToolbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState({
    allClaims: 'All claims',
    status: 'Status',
    priority: 'Priority',
  });

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  };

  const handleMenuClose = (type: string) => {
    setAnchorEl({ ...anchorEl, [type]: null });
  };

  const handleMenuItemClick = (type: string, value: string) => {
    setSelectedValue({ ...selectedValue, [type]: value });
    handleMenuClose(type);
    // Call the API here based on the selected value
    console.log(`API call for ${type}: ${value}`);
  };

  const menuItems = {
    allClaims: ['All claims', 'Claim 1', 'Claim 2'],
    status: ['Status', 'Open', 'Closed'],
    priority: ['Priority', 'High', 'Low'],
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
        Initiate claim
      </Button>
      {['allClaims', 'status', 'priority'].map((type) => (
        <Box key={type}>
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            onClick={(event) => handleMenuOpen(event, type)}
            sx={{
              borderColor: '#E0E0E0',
              color: '#000',
              borderRadius: 1.5,
              textTransform: 'none',
            }}
          >
            {selectedValue[type]}
          </Button>
          <Menu
            anchorEl={anchorEl?.[type]}
            open={Boolean(anchorEl?.[type])}
            onClose={() => handleMenuClose(type)}
          >
            {menuItems[type].map((item) => (
              <MenuItem
                key={item}
                onClick={() => handleMenuItemClick(type, item)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
    </Box>
  );
};

export default ClaimsToolbar;
