import React from 'react';
import { Box, Typography,  } from '@mui/material';

interface TaskStatsCardProps {
  title: string;
  value: string | number;
  showLink?: string;
}

const TaskStatsCard: React.FC<TaskStatsCardProps> = ({ title, value,  }) => {
  return (
    <Box
      sx={{
        minWidth: "207px",
        width: "100%",
        minHeight: "120px",
        p: "20px",
        backgroundColor: "white",
        borderRadius: "12px",
        outline: "1px solid #E9EAEB",
        outlineOffset: "-1px",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "8px",
        fontFamily: "Inter",
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: "14px", color: "#717680", lineHeight: "20px" }}>
        {title}
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: "24px", color: "#181D27", lineHeight: "38px" }}>
        {value}
      </Typography>
    </Box>
  );
};

export default TaskStatsCard;
