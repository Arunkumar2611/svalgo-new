import React from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CustomDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
};

export default function CustomDrawer({
  open,
  onClose,
  title,
  children,
  onSubmit,
}: CustomDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        marginTop: `${theme.mixins.toolbar.minHeight}px`,
      }}
    >
      <Box sx={{ width: 400, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
          {children}
        </Box>

        <Divider />

        {/* Action Buttons */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
