import React from "react";
import { Box, Typography, Toolbar, Divider } from "@mui/material";

interface CustomToolbarProps {
  title: string;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  title,
  subtitle,
  icon,
  rightContent,
  children,
}) => {
  return (
    <Box>
      <Toolbar
      disableGutters={true}
        sx={{
          p: 2,
          // backgroundColor: "#F7F9AC",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "56px",
        }}
      >
        {/* Left side: title and subtitle */}
        <Box>
          <Typography
            style={{
              width: "100%",
              color: "#181D27",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Right side: icon and extra content */}
        <Box display="flex" alignItems="center" gap={1}>
          {rightContent}
          {icon}
        </Box>
      </Toolbar>

      <Divider />

      {/* Render children below the toolbar */}
      <Box height="100%">{children}</Box>
    </Box>
  );
};

export default CustomToolbar;
