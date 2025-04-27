import { Box, Typography } from "@mui/material";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className = "" }: LogoProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      fontWeight="bold"
      fontSize={collapsed ? "1.25rem" : "1.5rem"} // text-lg vs text-xl
      className={className}
    >
      <svg
        width={collapsed ? "24" : "28"}
        height={collapsed ? "24" : "28"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: 8 }}
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <Typography
        component="span"
        variant="inherit"
        color="primary"
        fontWeight="bold"
        lineHeight={1}
      >
        SV
      </Typography>

      {!collapsed && (
        <Typography
          component="span"
          variant="inherit"
          sx={{ ml: 0.5 }}
          lineHeight={1}
        >
          Algo
        </Typography>
      )}
    </Box>
  );
}
