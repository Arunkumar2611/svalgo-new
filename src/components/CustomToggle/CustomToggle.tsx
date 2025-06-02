import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    borderRadius: '8px',
    overflow: 'hidden',
    gap: '2px',
    border: '1px solid #E0E0E0',
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    padding: '8px 12px',
    color: '#6B7280',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '12px',
    '&.Mui-selected': {
        backgroundColor: '#F4EBFF',
        color: '#7F56D9',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',

    },
    '&:not(:last-of-type)': {
        // borderRight: '1px solid #E0E0E0',
        borderRadius: '8px',
    },
    '&:hover': {
        // backgroundColor: '#F4EBFF',
        // color: '#7F56D9',
        // borderRadius: '12px',
        backgroundColor: 'transparent', // No hover background
        // color: '#6B7280',
    },
}));

interface CustomToggleProps {
  options: { value: string; label: string }[];
  selected: string;
  setSelected: (value: string) => void;
}

export default function CustomToggle({ options, selected, setSelected }: CustomToggleProps) {
    const handleChange = (_event: React.MouseEvent<HTMLElement>, value: string | null) => {
        if (value !== null) {
          setSelected(value);
        }
      };
    
      return (
        <StyledToggleButtonGroup
          value={selected}
          exclusive
          onChange={handleChange}
        >
          {options.map((option) => (
            <StyledToggleButton
              key={option.value}
              value={option.value}
              disableFocusRipple
            >
              {option.label}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      );
}
