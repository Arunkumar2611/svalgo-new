import { Box } from '@mui/material';


interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "#4F46E5",
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          ${payload[0].value}.00
        </Box>
      );
    }
    return null;
  };

export default CustomTooltip