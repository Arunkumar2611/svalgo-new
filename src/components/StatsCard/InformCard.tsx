import React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface InformCardProps {
    title: string;
    value: string | number;
    subvalue?: string | number;
    percentage?: string;
    subtitle?: string;
    background?: string;
    percentageColor?: string;
    icon?: boolean;
}

const InformCard: React.FC<InformCardProps> = ({
    title,
    value,
    subvalue,
    percentage,
    subtitle,
    background,
    percentageColor,
    icon=true,
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                minWidth: "282px",
                minHeight: "126px",
                height: "100%",
                p: '20px',
                backgroundColor:background ? background : '#FFFFFF',
                borderRadius: '12px',
                outline: '1px solid #E9EAEB',
                outlineOffset: '-1px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                fontFamily: 'Inter',
            }}
        >
            {/* Left section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flex: '1 1 0',
                }}
            >
                <Typography
                    sx={{
                        color: '#717680',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                    }}
                >
                    {title}
                </Typography>

                {/* Value and Percentage */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        height: '32px',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#181D27',
                            fontSize: '30px',
                            fontWeight: 600,
                            lineHeight: '38px',
                        }}
                    >
                        {value}
                    </Typography>
                    {percentage && <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <TrendingDownIcon
                            sx={{
                                fontSize: 16,
                                color: '#F04438',
                            }}
                        />
                        <Typography
                            sx={{
                                color: percentageColor ? percentageColor : '#B42318',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '20px',
                            }}
                        >
                            {percentage}
                        </Typography>
                    </Box>}
                    {subvalue && <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        
                        <Typography
                            sx={{
                                color: '#B42318',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '20px',
                            }}
                        >
                            {subvalue}
                        </Typography>
                    </Box>}
                </Box>

                <Typography
                    sx={{
                        color: '#717680',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '18px',
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            {/* Right Icon (placeholder for receipt icon) */}
            {icon && 
            <Box
                sx={{
                    width: 28,
                    height: 28,
                    position: 'relative',
                }}
            >
                <SvgIcon
                    sx={{
                        width: 18.67,
                        height: 21,
                        position: 'absolute',
                        top: '3.5px',
                        left: '4.67px',
                        color: '#9E77ED',
                    }}
                >
                    {/* Simple receipt-looking icon */}
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M3 2h14v17l-2-1.5L13 19l-2-1.5L9 19l-2-1.5L5 19l-2-1.5V2z"
                    />
                </SvgIcon>
            </Box>
            }
        </Box>
    );
};

export default InformCard;
