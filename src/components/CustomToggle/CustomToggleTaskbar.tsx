import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  gap: "2px",
  border: "1px solid #E0E0E0",
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  padding: "8px 12px",
  color: "#6B7280",
  backgroundColor: "#fff",
  border: "none",
  borderRadius: "12px",
  "&.Mui-selected": {
    backgroundColor: "#F4EBFF",
    color: "#7F56D9",
    borderRadius: "12px",
    border: "1px solid #E0E0E0",
  },
  "&:not(:last-of-type)": {
    // borderRight: '1px solid #E0E0E0',
    borderRadius: "12px",
  },
  "&:hover": {
    // backgroundColor: '#F4EBFF',
    // color: '#7F56D9',
    // borderRadius: '12px',
    backgroundColor: "transparent", // No hover background
    // color: '#6B7280',
  },
}));

export default function CustomToggleTaskbar() {
  const [selected, setSelected] = React.useState("top5");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string
  ) => {
    if (newSelection !== null) {
      setSelected(newSelection);
    }
  };

  return (
    <StyledToggleButtonGroup value={selected} exclusive onChange={handleChange}>
      <StyledToggleButton disableFocusRipple={true} value="favourites">
        Current
      </StyledToggleButton>
      <StyledToggleButton value="top5">Past dues</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
}
