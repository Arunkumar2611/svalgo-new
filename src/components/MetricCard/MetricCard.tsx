import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const MetricCard = ({ label, value, percentage, isNegative, isSplit }) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 0,
                border: '1px solid #E0E0E0',
                backgroundColor: isNegative ? '#FFF9F9' : '#F8FFFA',
                // backgroundColor: "red",
                p: 2,
                height: '100%',
                display: 'flex',
                minWidth: '100px',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Box display="flex" flexDirection={isSplit ? 'row' : 'column'} justifyContent="space-between" alignItems="center">
                <Box flex={1}>
                    <Typography variant="body2" color="textSecondary">
                        {label}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography variant="h6" fontWeight="bold">
                            {value}
                        </Typography>
                        {percentage && (
                            <Box display="flex" alignItems="center" color={isNegative ? 'error.main' : 'success.main'}>
                                {isNegative ? (
                                    <TrendingDownIcon fontSize="small" />
                                ) : (
                                    <TrendingUpIcon fontSize="small" />
                                )}
                                <Typography variant="caption" fontWeight="medium">
                                    {percentage}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default MetricCard;